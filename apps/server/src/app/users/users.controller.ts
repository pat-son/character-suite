import { Controller, Post, Body, OnModuleInit, Get } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiUseTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthResponseDto } from '../auth/dto/auth.dto';
import { AuthService } from '../auth/auth.service';
import { ModuleRef } from '@nestjs/core';
import { UserEntity } from './user.entity';

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
    @ApiOperation({ title: 'Create user', description: 'Returns an authentication token and the new user.' })
    @ApiCreatedResponse({ type: AuthResponseDto })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<AuthResponseDto> {
        const userEntity = await this.usersService.create(createUserDto);
        return this.authService.buildAuthResponse(userEntity);
    }

    @Get('getAll')
    @ApiOperation({ title: 'Find all users', description: 'Get all users for admin page' })
    getAllUsers(): Promise<UserEntity[]> {
        return this.usersService.getAllUsers();
    }
}
