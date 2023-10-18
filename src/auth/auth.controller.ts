import { Body, Controller, Get, Head, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSgnUpDto } from 'src/users/dto/userSignUpDto';
import { UserLoginDto } from 'src/users/dto/userLoginDto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    signUp(@Body() userSignUpDto: UserSgnUpDto): Promise<{token: string}>{
        return this.authService.signUp(userSignUpDto);
    }

    @Post('/login')
    login(@Body() userLoginDto: UserLoginDto): Promise<{token: string}>{
        return this.authService.login(userLoginDto);
    }
}
