import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flat } from './flats/flat.entity';
import { FlatsModule } from './flats/flats.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCEMA,
    entities: [Flat, User],
    synchronize: false
  }), FlatsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
