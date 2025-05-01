
import { ApiProperty } from '@nestjs/swagger';

export class QueueDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    tenantId: string;

    @ApiProperty()
    createdAt: Date;
}