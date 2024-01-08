/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, HttpStatus, Response, Param, Req } from '@nestjs/common';
import { DateService } from '../services/date.service';

@Controller('dates')

export class DateController {

    constructor(private readonly datesService: DateService) { }

    @Delete(':dateId')
    
    public async deleteUser( @Param('dateId') dateId: bigint) {
        
        const answer = await this.datesService.deleteDate(dateId);
        return answer;
    }
}
