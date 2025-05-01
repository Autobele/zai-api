import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/config/database/database.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly databaseService: DatabaseService,
    ) { }

    createToken(user: User) {
        return {
            token: this.jwtService.sign(
                {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    tenantId: user.tenantId,
                    profile: user.profile
                },
                {
                    subject: String(user.id),
                },
            ),
        };
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token);
            return data;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch (error) {
            return false;
        }
    }

    async login(email: string, password: string) {
        const user = await this.databaseService.user.findFirst({
            where: {
                email,
            },
        });

        if (!user) {
            throw new UnauthorizedException('Email e/ou senha incorretos');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Email e/ou senha incorretos');
        }

        return this.createToken(user);
    }
}
