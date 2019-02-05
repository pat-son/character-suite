import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthResponseDto } from '../auth/dto/auth.dto';
import { AuthService } from '../auth/auth.service';

@Controller('users')
@ApiUseTags('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
        ) {}

    @Post()
    @ApiCreatedResponse({ type: AuthResponseDto })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<AuthResponseDto> {
        const userEntity = await this.usersService.create(createUserDto);

        return this.authService.buildAuthResponse(userEntity);
    }
}
