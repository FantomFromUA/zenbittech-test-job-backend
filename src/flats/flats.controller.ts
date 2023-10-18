import { Controller, Get } from '@nestjs/common';
import { FlatsService } from './flats.service';
import { Flat } from './flat.entity';

@Controller('flats')
export class FlatsController {
    
    constructor(private readonly flatsService: FlatsService){}

    @Get()
    getFlats(): Promise<Flat[]>{
        return this .flatsService.getFlats();
    }
}
