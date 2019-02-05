import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.registerAsync(
            {
                imports: [ConfigModule],
                useFactory: (configService: ConfigService) => {
                    return {
                        secretOrPrivateKey: configService.jwtSecret,
                        signOptions: {
                            expiresIn: '7d',
                        },
                    };
                },
                inject: [ConfigService]
            }
        ),
        forwardRef(() => UsersModule),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
