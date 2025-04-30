import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ValidateEmailBodyDto {
    @ApiProperty({
        description: 'Código OTP enviado por e-mail',
        example: '123456',
    })
    @IsString()
    otpCode: string;
}