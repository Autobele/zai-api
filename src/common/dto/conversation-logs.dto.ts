
import { ApiProperty } from '@nestjs/swagger';
import { EnumConversationLogsAction } from '@prisma/client';

export class ConversationLogsDto {
    @ApiProperty()
    id: string;

    @ApiProperty({ enum: EnumConversationLogsAction })
    action: EnumConversationLogsAction;

    @ApiProperty()
    description: string;

    @ApiProperty()
    ticketId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    tenantId: string;

    @ApiProperty()
    createdAt: Date;
}
