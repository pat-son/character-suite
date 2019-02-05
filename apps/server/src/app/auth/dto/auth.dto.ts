import { ApiModelProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class LoginDto {
    @ApiModelProperty({ example: 'test@example.com' })
    readonly email: string;

    @ApiModelProperty({ example: 'p455w0rd' })
    readonly password: string;
}

export class AuthResponseDto {
    @ApiModelProperty({ example: 'eyJhbGciOiJIUzI1NiIs...'})
    readonly jwt: string;

    @ApiModelProperty()
    readonly user: UserDto;
}
