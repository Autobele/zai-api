import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class AddMembersQueueDto {
  @ApiProperty({
    description: 'Array of user UUIDs to be added to the queue',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    type: [String],
    isArray: true
  })
  @IsArray()
  @IsUUID('4', { each: true })
  memberIds: string[];
}