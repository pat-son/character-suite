import { Body, Controller, Get, Param, Post, UseGuards, ForbiddenException, Patch, Put, Delete } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { User } from '../users/user.decorator';
import { UserEntity } from '../users/user.entity';
import { CreateSheetDto, SheetDto, UpdateSheetDto, ShortSheetDto } from './sheet.dto';
import { SheetsService } from './sheets.service';
import { SheetEntity } from './sheet.entity';

@Controller('sheets')
@ApiUseTags('sheets')
export class SheetsController {
    constructor(
        private readonly sheetsService: SheetsService
    ) {}

    @Get(':id')
    async getSheet(@Param('id') id: string): Promise<SheetDto> {
        const sheet = await this.sheetsService.findSheetById(id);
        return this.sheetsService.sheetEntityToDto(sheet);
    }

    @Get('/user/:userId')
    getSheetsByUser(@Param('userId') id: string): Promise<ShortSheetDto[]> {
        return this.sheetsService.findSheetsByUserId(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    createSheet(@Body() createSheetDto: CreateSheetDto, @User() user: UserEntity): Promise<SheetDto> {
        const sheet = this.sheetsService.createSheet(createSheetDto, user.id);
        return sheet;
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    async updateSheet(@Body() updateSheetDto: UpdateSheetDto, @Param('id') id: string, @User() user: UserEntity) {
        const sheetEntity = await this.sheetsService.findSheetById(id);
        if (!sheetEntity.ownerId.equals(user.id)) {
            throw new ForbiddenException('You do not have permission to edit this sheet.');
        }

        return await this.sheetsService.updateSheet(sheetEntity, updateSheetDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    async deleteSheet(@Param('id') id: string, @User() user: UserEntity) {
        const sheetEntity = await this.sheetsService.findSheetById(id);
        if (!sheetEntity.ownerId.equals(user.id)) {
            throw new ForbiddenException('You do not have permission to edit this sheet.');
        }
    }
}
