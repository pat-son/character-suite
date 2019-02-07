import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { hashSync } from 'bcryptjs';
import { ObjectID } from 'mongodb';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: MongoRepository<UserEntity>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.findOneByEmail(createUserDto.email);
        if (existingUser) {
            throw new BadRequestException('A user already exists with that email address');
        }
        const passwordHash = hashSync(createUserDto.password, 10);
        const newUser = new UserEntity(createUserDto.email, passwordHash, createUserDto.displayName);

        return await this.userRepository.save(newUser);
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOne({ email });
    }

    async findOneById(id: string): Promise<UserEntity> {
        return this.userRepository.findOne({ "_id": new ObjectID(id) } as any);
    }
}
