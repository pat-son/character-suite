import { Controller, Get, Param } from "@nestjs/common";
import { ApiUseTags } from '@nestjs/swagger';

@Controller('sheets')
@ApiUseTags('sheets')
export class SheetsController {
    constructor() {}

    @Get(':id')
    getSheet(@Param('id') id: string) {

    }
}
