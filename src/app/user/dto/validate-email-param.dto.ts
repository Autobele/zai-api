import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ValidateEmailParamDto {
    @ApiProperty({
        description: 'Hash do e-mail de notificação',
        example: 'd9562959-08b1-4c8b-96b8-6e387369a30f',
    })
    @IsString()
    hashNotificationEmail: string;
}