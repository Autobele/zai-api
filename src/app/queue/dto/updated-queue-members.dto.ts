import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsUUID } from "class-validator";

export class UpdateQueueUsersDto {
  @IsArray()
  @IsUUID("4", { each: true })
  @ApiProperty({ type: [String], description: 'Lista de UUID de usuários' })
  userIds: string[];
}