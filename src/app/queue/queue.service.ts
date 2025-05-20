import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database/database.service';
import { User } from '@prisma/client';
import { UserDefaultResponse } from '../user/response/user-default.response';
import { CreateQueueDTO } from './dto/create-queue.dto';

@Injectable()
export class QueueService {
    constructor(private readonly databaseService: DatabaseService) { }

    async findAll() {
        return this.databaseService.queue.findMany({
            select: {
                id: true,
                name: true,
                user: {
                    select: {
                        ...UserDefaultResponse
                    }
                }
            }
        })
    }

    async findOne(queueId: string) {
        return this.databaseService.queue.findUnique({
            where: {
                id: queueId
            },
            select: {
                id: true,
                name: true,
                user: {
                    select: {
                        ...UserDefaultResponse
                    }
                }
            }
        })
    }

    async create(createQueueDTO: CreateQueueDTO) {
        return this.databaseService.queue.create({
            data: createQueueDTO
        })
    }

    async checkUserHasPermision(currentUser: User, queueTenantId: string) {
        if (currentUser?.profile == 'OPERATOR') {
            throw new ForbiddenException('Você não tem permissão para realizar esta ação.')
        }

        if (currentUser?.tenantId != queueTenantId) {
            throw new ForbiddenException('Você não tem permissão para realizar esta ação.')
        }

        return true
    }

    async createWithTenant(currentUser: User, name: string) {
        await this.checkUserHasPermision(currentUser, currentUser.tenantId)

        const queueAlreadyExists = await this.databaseService.queue.findFirst({
            where: {
                name,
                tenantId: currentUser.tenantId
            }
        })

        if (queueAlreadyExists) {
            throw new ConflictException({
                statusCode: 409,
                message: 'Tenant já possui uma fila com este nome.',
                error: 'Conflict'
            });
        }

        return this.databaseService.queue.create({
            data: {
                name,
                tenantId: currentUser.tenantId
            }
        })
    }

    async listAllMembers(queueId: string) {
        return this.databaseService.queue.findUnique({
            where: {
                id: queueId
            },
            select: {
                id: true,
                name: true,
                user: {
                    select: {
                        ...UserDefaultResponse
                    }
                }
            }
        })
    }

    async listMemberStatusQueue(currentUser: User, queueId: string) {
        await this.checkUserHasPermision(currentUser, currentUser.tenantId)
        const users = await this.databaseService.user.findMany({
            where: {
                AND: [
                    {
                        tenantId: currentUser.tenantId
                    },
                ]
            },
            select: {
                id: true,
                name: true,
                filas: true
            }
        })
        return users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                isInQueue: user.filas.filter(filaId => filaId.id == queueId).length > 0 ? true : false,
            }
        })
    }

    async addMembers(currentUser: User, queueId: string, usersId: string[]) {
        await this.checkUserHasPermision(currentUser, currentUser.tenantId)

        return this.databaseService.queue.update({
            where: {
                id: queueId
            },
            data: {
                user: {
                    set: usersId.map((userId) => ({ id: userId }))
                }
            }
        })
    }
}
