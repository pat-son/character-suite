import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty({ example: 'test@example.com' })
    readonly email: string;

    @ApiModelProperty({ example: 'p455w0rd' })
    readonly password: string;

    @ApiModelProperty({ example: 'Test Account' })
    readonly displayName: string;
}
