import { Controller, Post, Body, OnModuleInit } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthResponseDto } from '../auth/dto/auth.dto';
import { AuthService } from '../auth/auth.service';
import { ModuleRef } from '@nestjs/core';

@Controller('users')
@ApiUseTags('users')
export class UsersController implements OnModuleInit {

    private authService: AuthService;

    constructor(
        private readonly usersService: UsersService,
        private readonly moduleRef: ModuleRef,
    ) {}

    onModuleInit() {
        // Load this service here to avoid circular dependency
        this.authService = this.moduleRef.get(AuthService, { strict: false });
    }

    @Post()
    @ApiCreatedResponse({ type: AuthResponseDto })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<AuthResponseDto> {
        const userEntity = await this.usersService.create(createUserDto);

        return this.authService.buildAuthResponse(userEntity);
    }
}
