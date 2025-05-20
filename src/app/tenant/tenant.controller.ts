import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RegisterTenantDto } from './dto/register-tenant.dto';
import { UserService } from '../user/user.service';
import { CreateMemberToTenantDto } from '../user/dto/create-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';

@Controller('tenant')
export class TenantController {
    constructor(private readonly tenantService: TenantService, private readonly userService: UserService,) { }

    @Get()
    // TODO: ADMIN ROUTE
    @ApiOperation({
        summary: 'Lista todos os tenants criados',
    })
    findAll() {
        return this.tenantService.findAll()
    }

    @Post('')
    @ApiOperation({
        summary: 'Criar Tenant',
    })
    async register(@Body() body: RegisterTenantDto) {
        return this.tenantService.registerTenant(body)
    }

    @UseGuards(AuthGuard)
    @Post('add-member')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Adicionar membro ao tenant',
    })
    async addMember(@User() currentUser, @Body() body: CreateMemberToTenantDto) {
        return this.tenantService.addMemberToTenant(currentUser, body)
    }

    @UseGuards(AuthGuard)
    @Get('list-members')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Listar todos os membros do seu tenant',
    })
    listMembers(@User() currentUser) {
        return this.tenantService.listMembers(currentUser)
    }
}
