import { ApiProperty } from '@nestjs/swagger';
import { EnumWhatsAppStatus } from '@prisma/client';

export class WhatsAppDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    number: string;

    @ApiProperty({ enum: EnumWhatsAppStatus })
    status: EnumWhatsAppStatus;

    @ApiProperty()
    tenantId: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}