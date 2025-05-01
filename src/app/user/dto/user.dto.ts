import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EnumUserProfile } from '@prisma/client';

export class UserDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ enum: EnumUserProfile })
    profile: EnumUserProfile;

    @ApiProperty()
    isDeleted: boolean;

    @ApiProperty()
    tenantId: string;

    @ApiProperty()
    verifyEmail: boolean;

    @ApiProperty()
    hashNotificationEmail: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiPropertyOptional()
    otp?: string;

    @ApiPropertyOptional()
    otpCreatedAt?: Date;
}