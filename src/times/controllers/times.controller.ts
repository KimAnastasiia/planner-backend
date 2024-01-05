/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, HttpStatus, Response, Param, Req } from '@nestjs/common';
import { TimesService } from '../services/times.service';
@Controller('times')

export class TimesController {

    constructor(private readonly timesService: TimesService) { }

    
    @Delete(':timeId')
    
    public async deleteUser( @Param('timeId') timeId: bigint) {
        
        const answer = await this.timesService.deleteTime(timeId);
        return answer;
    }
}
