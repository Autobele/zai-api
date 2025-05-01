
import { ApiProperty } from '@nestjs/swagger';

export class ApiConfigsDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    token: string;

    @ApiProperty()
    urlServiceStatus: string;

    @ApiProperty()
    urlMessageStatus: string;

    @ApiProperty()
    authToken: string;

    @ApiProperty()
    whatsappId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    tenantId: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
