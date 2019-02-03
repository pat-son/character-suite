import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiModelProperty({ example: 'test@example.com' })
    readonly email: string;

    @ApiModelProperty({ example: 'p455w0rd' })
    readonly password: string;
}
