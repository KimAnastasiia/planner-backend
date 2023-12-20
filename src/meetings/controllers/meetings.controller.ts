/* eslint-disable prettier/prettier */
import { createMeetingDto } from 'src/dtos/createMeeting.dto';
import { MeetingsService } from '../services/meetings.service';
import { Body, Controller, Post, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { Request } from 'express';
@Controller('meetings')
export class MeetingsController {

    constructor(private readonly meetingsService: MeetingsService) { }
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
        return meeting.id;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          error: 'Failed to create meeting.',
        }; // Handle errors appropriately
      }
    }
}
