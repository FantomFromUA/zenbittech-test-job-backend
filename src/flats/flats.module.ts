import { Module } from '@nestjs/common';
import { FlatsController } from './flats.controller';
import { FlatsService } from './flats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flat } from './flat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flat])],
  controllers: [FlatsController],
  providers: [FlatsService]
})
export class FlatsModule {}
