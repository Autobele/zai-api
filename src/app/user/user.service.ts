import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

    async create(createUserDto: CreateUserDto) {
        return this.databaseService.user.create({
            data: {
                ...createUserDto,
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
}
