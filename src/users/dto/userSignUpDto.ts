import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSgnUpDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail({}, {message: "Enter correct email"})
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}