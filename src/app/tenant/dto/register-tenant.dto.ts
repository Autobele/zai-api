import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator"
import { EnumTenantStatus } from "../enum/tenant-status.enum"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { CreateUserDtoWithoutTenant } from "src/app/user/dto/create-user.dto"

export class RegisterTenantDto {
    @ApiProperty({ example: 'All Stark' })
    @IsString()
    @IsNotEmpty({ message: 'Nome do tenant é obrigatório' })
    @MinLength(4)
    readonly name: string

    @ApiProperty({ type: () => CreateUserDtoWithoutTenant })

    @ValidateNested()
    @Type(() => CreateUserDtoWithoutTenant)
    user: CreateUserDtoWithoutTenant
}
