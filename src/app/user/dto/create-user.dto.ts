import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator"
import { ApiProperty, OmitType } from "@nestjs/swagger"
import { EnumUserProfile } from "../enum/user-profile.enum"

export class CreateUserDto {
    @ApiProperty({ example: 'Hikaro Eduardo' })
    @IsString()
    @IsNotEmpty({ message: 'Nome do usuário é obrigatório' })
    @MinLength(4)
    readonly name: string

    @ApiProperty({ example: 'hikaro.eduardo@allstart.com.br' })
    @IsEmail()
    @IsNotEmpty({ message: 'Email é obrigatório' })
    readonly email: string

    @ApiProperty({ example: 'Zai@12345678' })
    @IsString()
    @IsNotEmpty({ message: 'Senha é obrigatória' })
    @Matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
        {
            message:
                'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula, um número e um símbolo.',
        },
    )
    readonly password: string


    @ApiProperty({ enum: EnumUserProfile })
    @IsEnum(EnumUserProfile)
    readonly profile: EnumUserProfile

    @ApiProperty({ example: '1f7c986a-7bc5-4e52-a2f7-c9ccba7dd54a' })
    @IsString()
    @IsNotEmpty({ message: 'Tenant UUID é obrigatório' })
    readonly tenantId: string
}

export class CreateUserDtoWithoutTenant extends OmitType(CreateUserDto, ['tenantId', 'profile'] as const) { }
export class CreateMemberToTenantDto extends OmitType(CreateUserDto, ['tenantId'] as const) { }