/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { createMeetingDto } from 'src/dtos/createMeeting.dto';
import { MeetingsService } from '../services/meetings.service';
import { Body, Controller, Post, UsePipes, ValidationPipe, Req, Get, Query, Put, Param } from '@nestjs/common';
import { Request } from 'express';
import { MeetingUpdateDto } from 'src/dtos/meetingUpdate.dto';

@Controller('meetings')
export class MeetingsController {

  constructor(private readonly meetingsService: MeetingsService) { }
  @Get()
  async getMeeting(@Query() query) {
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
  @Put() // Assuming you are passing the meetingId as part of the URL
  
  async updateMeeting(
    @Body() updateData: MeetingUpdateDto, // You'll need to create a DTO for the update data
  ) {

    try {
      const updatedMeeting = await this.meetingsService.updateMeeting(updateData);
      return updatedMeeting;
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: 'Failed to update meeting.',
      };
    }
  }
  @Get("/list")

  async getMeetingByEmail(@Req() request: Request) {
    const email = request["userEmail"]
    try {
      const meetings = await this.meetingsService.getMeetingsByEmail(email);
      return meetings;
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: 'Failed to get meetings.',
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
      const meetingId: bigint = meeting.id
      return { meetingId: meetingId };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: 'Failed to create meeting.',
      }; // Handle errors appropriately
    }
  }
}
