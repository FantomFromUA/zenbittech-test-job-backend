import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSgnUpDto } from 'src/users/dto/userSignUpDto';
import { User } from 'src/users/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcryptjs from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/users/dto/userLoginDto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ){}

    async signUp(userSignUpDto: UserSgnUpDto): Promise<{token: string}>{
        const {name, email, password} = userSignUpDto;

        const options: FindOneOptions<User> = {
          where: { email }, 
        };

        const findUser = await this.userRepository.findOne(options);

        if(findUser){
          throw Error("User with this email already exist")
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await this.userRepository.save({
            name,
            email,
            password: hashedPassword
        });

        const token = this.jwtService.sign({id: user.id});

        return {token};
    }

    async login(userLoginDto: UserLoginDto): Promise<{token: string}>{
        const { email, password } = userLoginDto;

        const options: FindOneOptions<User> = {
            where: { email }, 
          };

        const user = await this.userRepository.findOne(options);
    
        if (!user) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        const isPasswordValid = await bcryptjs.compare(password, user.password);
    
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        const token = this.jwtService.sign({ id: user.id });
    
        return { token };
    }
}
