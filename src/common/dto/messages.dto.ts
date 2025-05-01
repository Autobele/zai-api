import { ApiProperty } from '@nestjs/swagger';

export class MessagesDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    body: string;

    @ApiProperty()
    ack: number;

    @ApiProperty()
    read: boolean;

    @ApiProperty()
    mediaType: string;

    @ApiProperty()
    mediaUrl: string;

    @ApiProperty()
    ticketId: string;

    @ApiProperty()
    contactId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    tenantId: string;

    @ApiProperty()
    fromMe: boolean;

    @ApiProperty()
    isDeleted: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}