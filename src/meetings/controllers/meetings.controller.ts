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
      const meetingDates = await this.meetingsService.getMeeting(updateData.id,updateData.token)
      const listOfNewTimesId=[]
      const listOfAllTimedIds=[]
      const listOfIdsAllDates=[]
      const listOfNewIdDates=[]

      meetingDates[0].dates.forEach((d)=>{
        listOfIdsAllDates.push(d.id)
        d.times.forEach((t)=>listOfAllTimedIds.push(t.id))
      })
      
      updateData.dates.forEach((d)=>{
        listOfNewIdDates.push(d.id)
        d.times.forEach((t)=>listOfNewTimesId.push(t.id))
      })
      const listOfNewInvitedEmails=updateData.invited.filter(iNew => !meetingDates[0].invited.some(iPrev=>iPrev.email==iNew.email))
      console.log(listOfNewInvitedEmails)
      await Promise.all(
        listOfAllTimedIds.map(async (tId) => {
          const exist = listOfNewTimesId.find((nTId) => nTId === tId);
          if (!exist) {
              await this.participationService.deleteParticipationByTimeId(tId);
              await this.timesService.deleteTime(tId)
          }
        })
      );

     await Promise.all(
      listOfIdsAllDates.map(async (prevD) => {
          const exist = listOfNewIdDates.find((newD) => newD === prevD);
          if (!exist) {
              await this.datesService.deleteDate(prevD);
          }
        })
      );
      const allParticipationsOfThisMeeting = await this.participationService.getParticipation(meetingDates[0].id)
      if(allParticipationsOfThisMeeting.length>0){     
        await Promise.all(
          allParticipationsOfThisMeeting.map(async(p)=>{
            if(updateData.invited.length>0){
              const exist = updateData.invited.find((newI)=>p.userEmail == newI.email)
              if (!exist) {
                await this.participationService.deleteParticipation(meetingDates[0].id,p.userEmail);
              }
            }else{
              await this.participationService.deleteParticipation(meetingDates[0].id,p.userEmail);
            }

          })
        );
      }

      await this.invitedService.deleteInvitations(meetingDates[0].id, email)

      const updatedMeeting = await this.meetingsService.updateMeeting(email, updateData, listOfNewInvitedEmails);
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
    if(!meetingData.limitedSelection) meetingData.amountOfLimitedSelection=0
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

        await this.invitedService.deleteInvitations(id,userEmail )
   

        const meetingDates= await this.meetingsService.getMeeting(id,token)
        console.log(meetingDates)

       
        await this.participationService.deleteParticipationByMeetingId(id)
       
        for (const d of meetingDates[0].dates) {
          await this.timesService.deleteTimesByDateId(d.id);
        }

        await this.datesService.deleteDateByMeeyingId(id)
        const answer = await this.meetingsService.deleteMeeting(id,token,userEmail);

        return answer;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        error: 'Failed to delete meeting.',
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
