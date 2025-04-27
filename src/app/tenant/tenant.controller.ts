import { Body, Controller, Get, Post } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { EnumTenantStatus } from './enum/tenant-status.enum';
import { ApiOperation } from '@nestjs/swagger';

@Controller('tenant')
export class TenantController {
    constructor(private readonly tenantService: TenantService) { }

    @Get()
    // TODO: ADMIN ROUTE
    @ApiOperation({
        summary: 'Lista todos os tenants criados',
    })
    findAll() {
        return this.tenantService.findAll()
    }

    @Get(':id')
    findOne() {
        return true
    }

    @Post()
    create(@Body() createTenantDto: CreateTenantDto) {
        return this.tenantService.create({
            name: createTenantDto.name
        })
    }
}
