/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { TimesService } from '../services/times.service';
import { addTimesDto } from 'src/dtos/addTimes.dto';
import { Request } from 'express';
@Controller('times')

export class TimesController {

    constructor(private readonly timesService: TimesService) { }

    @Post()
    @UsePipes(new ValidationPipe())

    async addTimes(
        @Body() timesDto: addTimesDto,
        @Req() request: Request
    ) {
        try {
            const idMeeting = request["idMeeting"];
            const idDay = request["idDay"];
            // Iterate over each time in the array and add it to the database
            /*
            for (let i=0; i<timesDto.times.length; i++) {
                
                const time = timesDto.times[i];
                const obj = {
                    time: [time], // Wrap the string in an array if your service expects an array
                    idMeeting:Number(idMeeting),
                    idDay:Number(idDay),
                };

               // await this.timesService.postTimes(obj);
            }
            */

            return {
                success: true,
                message: 'Times added successfully.',
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                error: 'Failed to add times.',
            }; // Handle errors appropriately
        }
    }
}
