import { ApiProperty } from '@nestjs/swagger';
export class ContactsDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    number: string;

    @ApiProperty()
    tenantId: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
