import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserEntity } from './users/user.entity';
import { SheetsModule } from './sheets/sheets.module';
import { Pathfinder1stSheetEntity } from './sheets/sheet.entity';

@Module({
    imports: [
        ConfigModule,
        UsersModule,
        AuthModule,
        SheetsModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const { username, password } = configService.mongoCredentials;
                return {
                    type: 'mongodb',
                    url: `mongodb+srv://${username}:${password}@character-suite-dev-4qj1p.mongodb.net/dev?retryWrites=true`,
                    database: 'dev',
                    entities: [UserEntity, Pathfinder1stSheetEntity],
                    synchronize: true,
                    useNewUrlParser: true,
                };
            },
            inject: [ConfigService]
        }),
    ],
})
export class AppModule {}
