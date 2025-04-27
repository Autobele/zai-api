import { IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { EnumUserProfile } from "../enum/user-profile.enum"

export class CreateUserDto {
    @ApiProperty({ example: 'Hikaro Eduardo' })
    @IsString()
    @IsNotEmpty({ message: 'Nome do usuário é obrigatório' })
    @MinLength(4)
    readonly name: string

    @ApiProperty({ example: 'hikaro.eduardo@allstart.com.br' })
    @IsString()
    @IsNotEmpty({ message: 'Email é obrigatório' })
    @MinLength(4)
    readonly email: string

    @ApiProperty({ example: 'fh6yx3]Ly88V' })
    @IsString()
    @IsNotEmpty({ message: 'Senha é obrigatória' })
    @MinLength(4)
    readonly password: string


    @ApiProperty({ enum: EnumUserProfile })
    @IsOptional()
    @IsEnum(EnumUserProfile)
    readonly profile?: EnumUserProfile

    @ApiProperty({ example: '1f7c986a-7bc5-4e52-a2f7-c9ccba7dd54a' })
    @IsString()
    @IsNotEmpty({ message: 'Tenant UUID é obrigatório' })
    @MinLength(4)
    readonly tenantId: string
}
