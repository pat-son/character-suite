import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto, LoginDto } from '../dtos/user.dto';
import { ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';

@Controller('users')
export class UserController {
    @Post()
    @ApiUseTags('users')
    @ApiImplicitBody({ name: 'user', required: true, type: CreateUserDto })
    createUser(@Body() createUserDto: CreateUserDto) {
        console.dir('test', createUserDto);
        return 'User created';
    }

    // @Post()
    // login(@Body() body: LoginDto) {
    //     return 'Logged in';
    // }
}
