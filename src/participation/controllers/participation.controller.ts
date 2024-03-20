/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Put, UsePipes, ValidationPipe, Param, Delete, Req,HttpStatus, HttpException  } from '@nestjs/common';
import { ParticipationService } from '../servicies/participation.service';
import { Request } from 'express';
import { createPrivateParticipationDto } from 'src/dtos/createPrivateParticipation.dto';
import { MeetingsService } from 'src/meetings/services/meetings.service';
import { createParticipationDto } from 'src/dtos/createParticipation.dto';
import { sendEmail } from 'src/utils/sendEmail';
@Controller('participation')
export class ParticipationController {

  constructor(private readonly participationService: ParticipationService,
    private meetingsService:MeetingsService) { }
  
  @Get(":meetingId")
    async getParticipation(@Param('meetingId') meetingId: bigint) {

    try {
      const participation = await this.participationService.getParticipation(meetingId);
      return participation;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        error: 'Failed to verificate user.',
      }, HttpStatus.BAD_REQUEST);
    }
  }
  @Put()
  async editParticipation(@Req() request: Request, @Body() participationData: createParticipationDto,) {
    try {
      const userEmail = request["userEmail"]
      const answer = await this.participationService.deleteParticipation(participationData.meetingId, userEmail);

      if (answer) {

        try {
    
          for (let i = 0; i < participationData.timesIds.length; i++) {
            participationData.token = "null"
            participationData.time = participationData.timesIds[i]
            await this.participationService.postParticipation(participationData);
          }
          const organizerData = await this.meetingsService.getMeeting(participationData.meetingId, participationData.token);
          await sendEmail(organizerData[0].userEmail,'Notification of voting changes at your meeting ' + organizerData[0].title,`Hello, user ${participationData.name} just changed his vote` )
          return { message: "done" };
        } catch (error) {
          console.error(error);
          throw new HttpException({
            success: false,
            error: 'Failed to edit participation.',
          }, HttpStatus.BAD_REQUEST);
        }
      }

    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        error: 'Failed to update participation.',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())

  async postParticipation(

    @Body() participationData: createPrivateParticipationDto,
    @Req() request: Request 
  ) {
    const userEmail = request["userEmail"]

    try {
        participationData.userEmail = userEmail
        participationData.token="null"

        const organizerData = await this.meetingsService.getMeeting(participationData.meetingId, participationData.meetingToken);
        const invited= organizerData[0].invited.find((i)=>i.email==userEmail)
        if(invited){
          const newParticipation = await this.participationService.postParticipation(participationData);
          await sendEmail(organizerData[0].userEmail, 'Notification of voting in your meeting ' + organizerData[0].title, `Hello, user ${participationData.name} just voted`)
          return newParticipation
        }else{
          throw new Error('Failed to post participation.');
        }

    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        error: 'Failed to create participation.',
      }, HttpStatus.BAD_REQUEST);
    }
  }
  @Delete(':timeId')
    
  public async deleteParticipationByTimeIdAndEmail(@Param('timeId') timeId: bigint,  @Req() request?: Request) {
    
    try{
      const userEmail = request["userEmail"]
      const answer = await this.participationService.deleteParticipationByTimeIdAndEmail(timeId,userEmail);
      return answer;
      
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        error: 'Failed to update participation.',
      }, HttpStatus.BAD_REQUEST);
    }
  }
}

