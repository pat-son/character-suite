import { Controller, Post, Body } from "@nestjs/common";
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.logIn(loginDto.email, loginDto.password);
    }
}
