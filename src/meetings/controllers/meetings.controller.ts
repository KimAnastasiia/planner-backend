/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { createMeetingDto } from 'src/dtos/createMeeting.dto';
import { MeetingsService } from '../services/meetings.service';
import { Body, Controller, Post, UsePipes, ValidationPipe, Req, Get, Query } from '@nestjs/common';
import { Request } from 'express';
import { DateService } from 'src/date/services/date.service';
import { TimesService } from 'src/times/services/times.service';
@Controller('meetings')
export class MeetingsController {

    constructor(private readonly meetingsService: MeetingsService) { }
    @Get()
    async getMeeting( @Query() query) {
      const id = query["meetingId"]
      try {
        const meeting = await this.meetingsService.getMeeting(id);
        return meeting;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          error: 'Failed to get meeting.',
        }; // Handle errors appropriately
      }
    }
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
        return {meetingId:meetingId};
      } catch (error) {
        console.error(error);
        return {
          success: false,
          error: 'Failed to create meeting.',
        }; // Handle errors appropriately
      }
    }
}
