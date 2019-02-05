import { Controller, Post, Body } from "@nestjs/common";
import { LoginDto, AuthResponseDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    @ApiCreatedResponse({ type: AuthResponseDto})
    login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
        return this.authService.logIn(loginDto.email, loginDto.password);
    }
}
