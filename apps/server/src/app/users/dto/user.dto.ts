import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty({ example: 'test@example.com' })
    readonly email: string;

    @ApiModelProperty({ example: 'p455w0rd' })
    readonly password: string;

    @ApiModelProperty({ example: 'Test Account' })
    readonly displayName: string;
}

export class UserDto {
    @ApiModelProperty({ example: 'test@example.com' })
    readonly email: string;

    @ApiModelProperty({ example: 'Test Account' })
    readonly displayName: string;

    @ApiModelProperty({ example: 'd3ec9f67-7b53-4e8c-be5d-7baf05483da8' })
    readonly id: string;
}
