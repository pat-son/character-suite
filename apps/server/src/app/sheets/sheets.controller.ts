import { Controller, Get, Param, Post, Body, UseGuards, Req } from "@nestjs/common";
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateSheetDto } from './sheet.dto';
import { SheetsService } from './sheets.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.decorator';
import { UserEntity } from '../users/user.entity';

@Controller('sheets')
@ApiUseTags('sheets')
export class SheetsController {
    constructor(
        private readonly sheetsService: SheetsService
    ) {}

    @Get(':id')
    getSheet(@Param('id') id: string) {
        return this.sheetsService.findSheetById(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    createSheet(@Body() createSheetDto: CreateSheetDto, @User() user: UserEntity) {
        const sheet = this.sheetsService.createSheet(createSheetDto, user.id);
        return sheet;
    }
}
