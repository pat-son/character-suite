import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('users')
@ApiUseTags('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}
