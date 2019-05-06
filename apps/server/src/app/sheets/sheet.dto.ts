import { ApiModelProperty } from '@nestjs/swagger';
import { UserDto } from '../users/dto/user.dto';
import { GameEnum } from './sheets.enum';

export class CreateSheetDto {
    @ApiModelProperty({ example: 'Korgun Starwatcher' })
    readonly name: string;
}

export class SheetDto {
    @ApiModelProperty({ example: '123' })
    id: number;

    @ApiModelProperty({ example: "2019-02-07T06:32:12.283Z" })
    createdDate: Date;

    @ApiModelProperty({ example: "2019-02-07T06:32:12.283Z" })
    updatedDate: Date;

    @ApiModelProperty()
    owner: UserDto;

    @ApiModelProperty({ example: "pf1e"})
    gameType: GameEnum;

    @ApiModelProperty({ example: "Korgun Starwatcher" })
    name: string;

    @ApiModelProperty({ example: {} })
    data: any;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ShortSheetDto = Omit<SheetDto, 'data' | 'owner'>;

export class UpdateSheetDto {
    @ApiModelProperty({ example: 'Korgun Starwatcher' })
    name: string;

    @ApiModelProperty({ example: {} })
    data: any;
}
