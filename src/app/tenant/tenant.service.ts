import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database/database.service';
import { CreateTenantDTO } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { EnumTenantStatus, User } from '@prisma/client';
import { RegisterTenantDto } from './dto/register-tenant.dto';
import { UserService } from '../user/user.service';
import { EnumUserProfile } from '../user/enum/user-profile.enum';
import { CreateMemberToTenantDto, CreateUserDto } from '../user/dto/create-user.dto';
import { UserDefaultResponse } from '../user/response/user-default.response';

@Injectable()
export class TenantService {
    constructor(private readonly databaseService: DatabaseService, private readonly userService: UserService) { }

    async findAll() {
        return this.databaseService.tentant.findMany({
            include: {
                user: true,
                queue: {
                    select: {
                        id: true,
                        name: true,
                        user: true
                    },
                }
            }
        })
    }

    async findOne(tenantId: string) {
        return this.databaseService.tentant.findUnique({
            where: {
                id: tenantId
            }
        })
    }

    async create(CreateTenantDTO: CreateTenantDTO) {
        return this.databaseService.tentant.create({
            data: {
                name: CreateTenantDTO.name,
                status: CreateTenantDTO.status ?? EnumTenantStatus.ACTIVE
            }
        })
    }

    async registerTenant(createTenantWithUser: RegisterTenantDto) {
        return this.databaseService.$transaction(async () => {
            const tenant = await this.create({ name: createTenantWithUser.name })

            const createdUser = await this.userService.create({
                ...createTenantWithUser.user,
                profile: EnumUserProfile.ADMIN,
                tenantId: tenant.id
            })

            return {
                tenant,
                user: createdUser
            }
        })
    }

    async update(tenantId: string, updatedTenant: UpdateTenantDto) {
        return this.databaseService.tentant.update({
            where: {
                id: tenantId
            },
            data: updatedTenant
        })
    }

    async addMemberToTenant(currentUser: User, newMember: CreateMemberToTenantDto) {
        if (currentUser?.profile == 'OPERATOR') {
            throw new ForbiddenException('Você não tem permissão para realizar esta ação.')
        }

        if (currentUser?.profile == 'SUPERVISOR' && newMember?.profile == 'ADMIN') {
            throw new ForbiddenException('Você precisa de elevação para realizar esta ação.')
        }

        return this.databaseService.$transaction(async () => {
            const createdUser = await this.userService.create({
                ...newMember,
                profile: EnumUserProfile.ADMIN,
                tenantId: currentUser.tenantId
            })

            return {
                user: createdUser
            }
        })
    }

    async listMembers(user: User) {
        const data = await this.databaseService.user.findMany({
            where: {
                tenantId: user.tenantId
            },
            select: {
                ...UserDefaultResponse,
                profile: true
            }
        })

        return data
    }

}
