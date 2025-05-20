import { Controller, Get, Param, Res, Query, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { Response } from 'express';

@Controller('whatsapp')
export class WhatsappController {
    constructor(private readonly whatsappService: WhatsappService) { }

    @Get('connect/:userId')
    async connect(@Param('userId') userId: string, @Res() res: Response) {
        try {
            await this.whatsappService.connect(userId);
            setTimeout(() => {
                try {
                    const qrCode = this.whatsappService.getQrCode(userId);
                    const base64Image = qrCode.split(',')[1];
                    const imgBuffer = Buffer.from(base64Image, 'base64');
                    res.writeHead(200, {
                        'Content-Type': 'image/png',
                        'Content-Length': imgBuffer.length,
                    });
                    res.end(imgBuffer);
                } catch (err) {
                    res.status(202).send('QR Code ainda não disponível. Tente novamente.');
                }
            }, 1000);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('send/:userId')
    async sendMessage(
        @Param('userId') userId: string,
        @Body() body: { to: string; message: string },
    ) {
        try {
            if (!this.whatsappService.isUserConnected(userId)) {
                throw new Error('Usuário não conectado.');
            }
            await this.whatsappService.sendMessage(userId, body.to, body.message);
            return { status: 'Mensagem enviada' };
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
