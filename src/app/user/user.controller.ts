import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidateEmailParamDto } from './dto/validate-email-param.dto';
import { ValidateEmailBodyDto } from './dto/validate-email-body.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Put('validar-email/:hashNotificationEmail')
    async validateEmail(@Param() { hashNotificationEmail }: ValidateEmailParamDto, @Body() { otpCode }: ValidateEmailBodyDto) {
        this.userService.validateEmail(hashNotificationEmail, otpCode)
    }

    @UseGuards(AuthGuard)
    @Get('me')
    @ApiBearerAuth()
    async me(@User() user) {
        return { user };
    }
}
