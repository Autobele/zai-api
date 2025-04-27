import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database/database.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { EnumTenantStatus } from '@prisma/client';

@Injectable()
export class TenantService {
    constructor(private readonly databaseService: DatabaseService) { }

    async findAll() {
        return this.databaseService.tentant.findMany()
    }

    async findOne(tenantId: string) {
        return this.databaseService.tentant.findUnique({
            where: {
                id: tenantId
            }
        })
    }

    async create(createTenantDto: CreateTenantDto) {
        return this.databaseService.tentant.create({
            data: {
                name: createTenantDto.name,
                status: createTenantDto.status ?? EnumTenantStatus.ACTIVE
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
}
