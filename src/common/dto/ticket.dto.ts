import { ApiProperty } from '@nestjs/swagger';
import { EnumTicketStatus } from '@prisma/client';

export class TicketDto {
    @ApiProperty()
    id: string;

    @ApiProperty({ enum: EnumTicketStatus })
    status: EnumTicketStatus;

    @ApiProperty()
    contactId: string;

    @ApiProperty()
    tenantId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}