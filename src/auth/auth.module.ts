import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
        useFactory: (configService: ConfigService) => ({
          global: true,
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: `${configService.get('JWT_EXPIRE')}`,
          },
        }),
        inject: [ConfigService],
      }),
    UsersModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
