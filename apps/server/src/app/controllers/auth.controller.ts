import { Controller, Post, Body, Get } from '@nestjs/common'
import { CreateUserDto, LoginDto } from '../dtos/user.dto';

@Controller('users')
export class UserController {
    @Post()
    createUser(@Body() body: CreateUserDto) {
        console.dir(body);
        return 'User created';
    }

    @Post()
    login(@Body() body: LoginDto) {
        return 'Logged in';
    }
}
