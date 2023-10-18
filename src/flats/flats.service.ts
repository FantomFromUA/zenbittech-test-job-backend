import { Injectable } from '@nestjs/common';
import { Flat } from './flat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FlatsService {

    constructor(
        @InjectRepository(Flat)
        private readonly flatsRepository: Repository<Flat>
    ){}

    async getFlats(): Promise<Flat[]>{
          const flats: Flat[] = await this.flatsRepository.find();  
          return flats;
    }
}
