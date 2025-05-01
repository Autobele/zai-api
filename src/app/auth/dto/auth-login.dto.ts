import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthLoginDTO {
  @ApiProperty({ example: 'autobele.silva@maida.health' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Maida@12345678' })
  @IsString()
  @MinLength(6)
  password: string;
}
