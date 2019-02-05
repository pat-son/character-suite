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

    @ApiModelProperty({ example: '5c5728ebcaea8b4a7c0a228c' })
    readonly id: string;
}
