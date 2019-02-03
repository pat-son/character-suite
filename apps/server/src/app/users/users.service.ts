import { Injectable } from "@nestjs/common";
import { User } from 'models/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: MongoRepository<UserEntity>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const passwordHash = hashSync(createUserDto.password, 10);
        const newUser = new UserEntity(createUserDto.email, passwordHash, createUserDto.displayName);

        return await this.userRepository.save(newUser);
    }

    async findOneByEmail(email: string): Promise<User> {
        return {} as any;
    }
}
