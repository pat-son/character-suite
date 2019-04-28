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
                const { username, password } = configService.postgresCredentials;
                return {
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    database: 'character-suite',
                    schema: 'dbo',
                    username,
                    password,
                    entities: [UserEntity, Pathfinder1stSheetEntity],
                    synchronize: true,
                };
            },
            inject: [ConfigService]
        }),
    ],
})
export class AppModule {}
