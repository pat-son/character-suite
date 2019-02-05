import { Module } from "@nestjs/common";
import { SheetsController } from './sheets.controller';
import { SheetsService } from './sheets.service';

@Module({
    imports: [],
    providers: [SheetsService],
    controllers: [SheetsController],
})
export class SheetsModule {}
