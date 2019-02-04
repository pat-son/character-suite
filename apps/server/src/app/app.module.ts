import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/user.entity';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                return {
                    type: 'mongodb',
                    url: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@character-suite-dev-4qj1p.mongodb.net/dev?retryWrites=true`,
                    database: 'dev',
                    entities: [UserEntity],
                    synchronize: true,
                };
            }
        }),
    ],
})
export class AppModule {}
