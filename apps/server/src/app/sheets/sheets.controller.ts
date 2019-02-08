import { Body, Controller, Get, Param, Post, UseGuards, Put, ForbiddenException } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { User } from '../users/user.decorator';
import { UserEntity } from '../users/user.entity';
import { CreateSheetDto, SheetDto, UpdateSheetDto } from './sheet.dto';
import { SheetsService } from './sheets.service';

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

        await this.sheetsService.updateSheet(sheetEntity, updateSheetDto);
        return true;
    }
}
