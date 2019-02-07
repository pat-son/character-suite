import { ApiModelProperty } from '@nestjs/swagger';
import { Pathfinder1stSheetEntity } from './sheet.entity';

export class CreateSheetDto {
    @ApiModelProperty({ example: 'Korgun Starwatcher' })
    readonly name: string;
}

export class SheetDto extends Pathfinder1stSheetEntity {

}
