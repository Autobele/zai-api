import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { QueueService } from './queue.service';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from '../decorators/user.decorator';
import { CreateQueueDTOWithTenant } from './dto/create-queue.dto';
import { AddMembersQueueDto } from './dto/add-members-queue.dto';

@Controller('queue')
export class QueueController {

    constructor(private readonly queueService: QueueService) { }

    @Get()
    // TODO: ADMIN ROUTE
    @ApiOperation({
        summary: 'Lista todas as filas criadas',
    })
    findAll() {
        return this.queueService.findAll()
    }


    @Get(':uuid')
    @ApiOperation({
        summary: 'Buscar fila por uuid',
    })
    @ApiParam({
        name: 'uuid',
        description: 'Fila UUID',
        type: 'string',
        format: 'uuid'
    })
    async findOne(@Param('uuid') uuid: string) {
        return this.queueService.findOne(uuid);
    }


    @UseGuards(AuthGuard)
    @Post('')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Criar fila a um tenant',
    })
    async createWithTenant(@User() currentUser, @Body() body: CreateQueueDTOWithTenant) {
        return this.queueService.createWithTenant(currentUser, body.name)
    }

    @UseGuards(AuthGuard)
    @Get(':uuid/members-status')
    @ApiBearerAuth()
    @ApiParam({
        name: 'uuid',
        description: 'Fila UUID',
        type: 'string',
        format: 'uuid'
    })
    @ApiOperation({
        summary: 'Buscar todos os membros de uma fila',
    })
    async listMembersStatusQueue(@User() currentUser, @Param('uuid', new ParseUUIDPipe({ version: '4' })) queueUUID: string) {
        return this.queueService.listMemberStatusQueue(currentUser, queueUUID)
    }

    @UseGuards(AuthGuard)
    @Put(':uuid/update-members')
    @ApiBearerAuth()
    @ApiParam({
        name: 'uuid',
        description: 'Fila UUID',
        type: 'string',
        format: 'uuid'
    })
    @ApiOperation({
        summary: 'Atualizar membros da fila',
    })
    async addMembers(@User() currentUser, @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string, @Body() body: AddMembersQueueDto) {
        return this.queueService.addMembers(currentUser, uuid, body.memberIds)
    }


}
