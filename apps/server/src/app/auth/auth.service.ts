import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcryptjs';
import { User } from 'models/user';

interface LoginResponse {
    jwt: string;
    user: User;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async logIn(email: string, password: string): Promise<LoginResponse> {
        const userEntity = await this.usersService.findOneByEmail(email);
        if (!userEntity) {
            throw new UnauthorizedException('Invalid email or password');
        }
        if (!compareSync(password, userEntity.passwordHash)) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const payload: JwtPayload = { id: userEntity.id, email: userEntity.email };
        const user: User = {
            email: userEntity.email,
            displayName: userEntity.displayName,
            id: userEntity.id,
        };
        return {
            jwt: this.jwtService.sign(payload),
            user
        };
    }

    async validateUser(payload: JwtPayload) {
        return await this.usersService.findOneByEmail(payload.email);
    }
}
