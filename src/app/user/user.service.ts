import { v4 as uuidv4 } from 'uuid';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/config/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { diffBetweenDateTime } from 'src/common/functions';

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) { }

    async findAll() {
        return this.databaseService.user.findMany()
    }

    async findOne(userId: string) {
        return this.databaseService.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    async findByEmail(email: string) {
        return this.databaseService.user.findUnique({
            where: {
                email
            }
        })
    }

    async create(createUserDto: CreateUserDto) {
        const userAlreadyExist = await this.findByEmail(createUserDto.email)

        if (userAlreadyExist) {
            throw new ConflictException('E-mail já está em uso.')
        }

        return this.databaseService.user.create({
            data: {
                ...createUserDto,
                hashNotificationEmail: uuidv4(),
                otp: this.generateNumericOTP(),
                otpCreatedAt: new Date()
            }
        })
    }

    async update(userId: string, updatedUsetDto: UpdateUserDto) {
        return this.databaseService.user.update({
            where: {
                id: userId
            },
            data: updatedUsetDto
        })
    }

    generateNumericOTP(length: number = 4): string {
        const digits = '0123456789';
        let otp = '';
        for (let i = 0; i < length; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }

    updateOtp(userId: string) {
        return this.databaseService.user.update({
            where: {
                id: userId
            },
            data: {
                otp: this.generateNumericOTP(),
                otpCreatedAt: new Date()
            }
        })
    }

    async validateEmail(hashNotificationEmail: string, otp: string) {
        const userExist = await this.databaseService.user.findUnique({
            where: {
                hashNotificationEmail
            }
        })

        if (!userExist?.hashNotificationEmail) {
            throw new NotFoundException('Hash do email não é válida.')
        }

        if (!userExist?.otpCreatedAt) {
            throw new ConflictException('OTP não possui uma data válida')
        }

        // OTP é válido por 20 minutos desde sua criação
        const otpIsValid = diffBetweenDateTime(userExist?.otpCreatedAt, new Date(), 20)

        if (!otpIsValid || userExist?.otp !== otp) {
            throw new ConflictException('OTP não é válido')
        }

        return this.databaseService.user.update({
            where: {
                hashNotificationEmail
            },
            data: {
                verifyEmail: true
            }
        })

    }

    async show(id: string) {
        await this.exists(id);
        return this.databaseService.user.findUnique({
            where: { id },
        });
    }

    async exists(id: string) {
        if (
            !(await this.databaseService.user.count({
                where: {
                    id,
                },
            }))
        ) {
            throw new NotFoundException(`O usuário de ID ${id} não existe`);
        }
    }

}
