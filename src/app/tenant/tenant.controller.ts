import { Body, Controller, Get, Post } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Controller('tenant')
export class TenantController {
    constructor(private readonly tenantService: TenantService) { }
    @Get()
    findAll() {
        return this.tenantService.findAll()
    }

    @Get()
    findOne() {

    }

    @Post()
    create(@Body() createTenantDto: CreateTenantDto) {
        return this.tenantService.create(createTenantDto)
    }
}
