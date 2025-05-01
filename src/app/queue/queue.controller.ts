import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { QueueService } from './queue.service';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { User } from '../decorators/user.decorator';
import { CreateQueueDTOWithTenant } from './dto/create-queue.dto';

@Controller('queue')
export class QueueController {

    constructor(private readonly queueService: QueueService) { }

    @UseGuards(AuthGuard)
    @Post('')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Criar fila a um tenant',
    })
    async createWithTenant(@User() currentUser, @Body() body: CreateQueueDTOWithTenant) {
        this.queueService.createWithTenant(currentUser, body.name)
    }

}
