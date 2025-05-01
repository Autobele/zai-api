import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EnumTenantStatus } from '@prisma/client';

export class TentantDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiPropertyOptional({ enum: EnumTenantStatus })
    status?: EnumTenantStatus;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
