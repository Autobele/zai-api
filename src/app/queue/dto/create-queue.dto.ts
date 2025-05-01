import { IsNotEmpty, IsString, MinLength } from "class-validator"
import { ApiProperty, OmitType } from "@nestjs/swagger"

export class CreateQueueDTO {
    @ApiProperty({ example: 'Comercial' })
    @IsString()
    @IsNotEmpty({ message: 'Nome da fila/departamento é obrigatório' })
    @MinLength(4)
    readonly name: string

    @ApiProperty({ example: '1f7c986a-7bc5-4e52-a2f7-c9ccba7dd54a' })
    @IsString()
    @IsNotEmpty({ message: 'Tenant UUID é obrigatório' })
    readonly tenantId: string

}

export class CreateQueueDTOWithTenant extends OmitType(CreateQueueDTO, ['tenantId'] as const) { }
