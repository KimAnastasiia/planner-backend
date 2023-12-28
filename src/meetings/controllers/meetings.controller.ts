/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { createMeetingDto } from 'src/dtos/createMeeting.dto';
import { MeetingsService } from '../services/meetings.service';
import { Body, Controller, Post, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { Request } from 'express';
import { DateService } from 'src/date/services/date.service';
import { TimesService } from 'src/times/services/times.service';
@Controller('meetings')
export class MeetingsController {

    constructor(private readonly meetingsService: MeetingsService,private readonly datesService: DateService) { }
    @Post()
    @UsePipes(new ValidationPipe())
    async createMeeting(
      @Body() meetingData: createMeetingDto,
      @Req() request: Request
      ) {
        console.log(request["userEmail"]);
 
      console.log(meetingData)
      meetingData.userEmail = request["userEmail"];
  
      try {
        const meeting = await this.meetingsService.postMeeting(meetingData);
    
        const meetingId:bigint = meeting.id

        /** 
        const objToCreateDate={

            datesArray:meetingData.datesArray,
            idMeeting:BigInt(meetingId)

        }
        const date = await this.datesService.postDate(objToCreateDate); 
        // insertar days
        let dayId = date.id
        // insertar los times

        **/

        return{message:"done"};
      } catch (error) {
        console.error(error);
        return {
          success: false,
          error: 'Failed to create meeting.',
        }; // Handle errors appropriately
      }
    }
}
