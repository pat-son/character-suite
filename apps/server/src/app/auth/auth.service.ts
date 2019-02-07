import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcryptjs';
import { User } from 'models/user';
import { UserEntity } from '../users/user.entity';
import { AuthResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async logIn(email: string, password: string): Promise<AuthResponseDto> {
        const userEntity = await this.usersService.findOneByEmail(email);
        if (!userEntity) {
            throw new UnauthorizedException('Invalid email or password');
        }
        if (!compareSync(password, userEntity.passwordHash)) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return this.buildAuthResponse(userEntity);
    }

    async validateUser(payload: JwtPayload) {
        return await this.usersService.findOneByEmail(payload.email);
    }

    buildAuthResponse(userEntity: UserEntity): AuthResponseDto {
        const payload: JwtPayload = { id: userEntity.id.toString(), email: userEntity.email };
        const user: User = {
            email: userEntity.email,
            displayName: userEntity.displayName,
            id: userEntity.id.toString(),
        };
        return {
            jwt: this.jwtService.sign(payload),
            user
        };
    }
}
