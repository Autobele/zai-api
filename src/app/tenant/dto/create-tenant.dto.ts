import { IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { EnumTenantStatus } from "../enum/tenant-status.enum"
import { ApiProperty } from "@nestjs/swagger"

export class CreateTenantDto {
    @ApiProperty({ example: 'All Stark' })
    @IsString()
    @IsNotEmpty({ message: 'Nome do tenant é obrigatório' })
    @MinLength(4)
    readonly name: string

    @ApiProperty({ enum: EnumTenantStatus })
    @IsOptional()
    @IsEnum(EnumTenantStatus)
    readonly status?: EnumTenantStatus

}
