import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
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

    findOneByEmail(email: string): Promise<UserEntity> { // TODO: don't return passwordHash when sending to user
        return this.userRepository.findOne({ email });
    }

    findOneById(id: string): Promise<UserEntity> {
        return this.userRepository.findOne({ id });
    }

    getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }
}
