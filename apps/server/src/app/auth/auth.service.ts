import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async logIn(email: string, password: string): Promise<string> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        if (!compareSync(password, user.passwordHash)) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const payload: JwtPayload = { id: user.id, email: user.email };
        return this.jwtService.sign(payload);
    }

    async validateUser(payload: JwtPayload) {
        return await this.usersService.findOneByEmail(payload.email);
    }
}
