/* eslint-disable prettier/prettier */
import { createMeetingDto } from 'src/dtos/createMeeting.dto';
import { MeetingsService } from '../services/meetings.service';
import { Body, Controller, Post, UsePipes,Param, ValidationPipe, Delete, Req, Get, Query, Put, HttpStatus, HttpException } from '@nestjs/common';
import { Request } from 'express';
import { getUniqueObjects } from 'src/utils/getUniqueValuesFromArrays';
import { InvitedService } from 'src/invited/services/invited.service';
import { TimesService } from 'src/times/services/times.service';
import { ParticipationService } from 'src/participation/servicies/participation.service';
import { DateService } from 'src/date/services/date.service';

@Controller('meetings')
export class MeetingsController {

  constructor(private readonly meetingsService: MeetingsService,
    private readonly invitedService: InvitedService,
    private readonly timesService: TimesService,
    private readonly participationService: ParticipationService,
    private readonly datesService: DateService

    ) { }
  @Get()
  async getMeeting(@Query() query) {
    const id = query["meetingId"]
    const token = query["token"]

    try {
      const meeting = await this.meetingsService.getMeeting(id, token);
      return meeting;
    } catch (error) {
      console.error(error);
      
      throw new HttpException({
        success: false,
        error: 'Failed to get meeting.',
      }, HttpStatus.BAD_REQUEST);
    }
  }
  @Put() // Assuming you are passing the meetingId as part of the URL

  async updateMeeting(
    @Body() updateData: createMeetingDto,
    @Req() request: Request // You'll need to create a DTO for the update data
  ) {
    const email = request["userEmail"]

    try {
      const updatedMeeting = await this.meetingsService.updateMeeting(email, updateData);
      return updatedMeeting;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        error: 'Failed to update meeting.',
      }, HttpStatus.BAD_REQUEST);
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
      throw new HttpException({
        success: false,
        error: 'Failed to get meetings.',
      }, HttpStatus.BAD_REQUEST);
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
    meetingData.invited = getUniqueObjects(meetingData.invited)
    meetingData.invited= meetingData.invited.filter((i)=>i.email!=meetingData.userEmail)
    
    try {
      const meeting = await this.meetingsService.postMeeting(meetingData);
      const meetingId: bigint = meeting.id
      return {
        meetingId: meetingId,
        token: meeting.token
      };
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        error: 'Failed to create meetings.',
      }, HttpStatus.BAD_REQUEST);
    }
  }
  @Delete(':id/:token')
    
  public async deleteMeeting(@Param('id') id: bigint, @Param('token') token: string, @Req() request?: Request) {
    
    try{
      const userEmail = request["userEmail"]
      const deleted = await this.invitedService.deleteInvitations(id,userEmail )
      if(deleted.success){

        const meetingDates= await this.meetingsService.getMeeting(id,token)
        console.log(meetingDates)

       
        await this.participationService.deleteParticipationByMeetingId(id)
       
        for (const d of meetingDates[0].dates) {
          await this.timesService.deleteTimesByDateId(d.id);
        }

        await this.datesService.deleteDateByMeeyingId(id)
        const answer = await this.meetingsService.deleteMeeting(id,token,userEmail);

        return answer;
      }
      
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        error: 'Failed to delete meeting.',
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
