import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database/database.service';
import { User } from '@prisma/client';
import { UserDefaultResponse } from '../user/response/user-default.response';
import { CreateQueueDTO } from './dto/create-queue.dto';

@Injectable()
export class QueueService {
    constructor(private readonly databaseService: DatabaseService) { }

    async findAll() {
        return this.databaseService.queue.findMany({
            include: {
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
        const userHasPermission = await this.checkUserHasPermision(currentUser, currentUser.tenantId)

        if (!userHasPermission) return

        return this.databaseService.queue.create({
            data: {
                name,
                tenantId: currentUser.tenantId
            }
        })
    }

}
