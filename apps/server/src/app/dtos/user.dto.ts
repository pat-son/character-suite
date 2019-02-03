import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;

    @ApiModelProperty()
    readonly displayName: string;
}

export class LoginDto {
    readonly email: string;
    readonly password: string;
}
