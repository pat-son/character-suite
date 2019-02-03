import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async logIn(email: string, password: string): Promise<any> {
        const user: JwtPayload = { email: 'test@example.com' };
        return this.jwtService.sign(user);
    }

    async validateUser(payload: JwtPayload) {
        return await this.usersService.findOneByEmail(payload.email);
    }
}
