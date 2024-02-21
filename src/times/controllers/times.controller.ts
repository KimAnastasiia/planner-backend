/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, HttpStatus, Response, Param, Req } from '@nestjs/common';
import { TimesService } from '../services/times.service';
import { ParticipationService } from 'src/participation/servicies/participation.service';
@Controller('times')

export class TimesController {

    constructor(private readonly timesService: TimesService) { }

    
    @Delete(':timeId')
    
    public async deleteTime( @Param('timeId') timeId: bigint) {
        
        const answer = await this.timesService.deleteTime(timeId);
        return answer;
    }
}
