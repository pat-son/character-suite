import { Module } from "@nestjs/common";
import { SheetsController } from './sheets.controller';
import { SheetsService } from './sheets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pathfinder1stSheetEntity } from './sheet.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([Pathfinder1stSheetEntity]),
        PassportModule.register({ defaultStrategy: 'jwt'}),
    ],
    providers: [SheetsService],
    controllers: [SheetsController],
})
export class SheetsModule {}
