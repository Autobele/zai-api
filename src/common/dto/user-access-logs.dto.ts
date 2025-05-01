
import { ApiProperty } from '@nestjs/swagger';
import { EnumUserAccessLogsEventType } from '@prisma/client';

export class UserAccessLogsDto {
    @ApiProperty()
    id: string;

    @ApiProperty({ enum: EnumUserAccessLogsEventType })
    eventType: EnumUserAccessLogsEventType;

    @ApiProperty()
    eventInfo: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    tenantId: string;

    @ApiProperty()
    createdAt: Date;
}
