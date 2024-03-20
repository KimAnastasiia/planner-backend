/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, Delete, HttpStatus, Put, Param, Req, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParticipationPublicService } from '../services/participation-public.service';
import { createParticipationDto } from 'src/dtos/createParticipation.dto';
import { MeetingsPublicService } from 'src/meetings-public/services/meetings-public.service';
import { sendEmail } from 'src/utils/sendEmail';
@Controller('participation-public')
export class ParticipationPublicController {
  constructor(private readonly participationPublicService: ParticipationPublicService,
    private meetingsPublicService: MeetingsPublicService) { }

  @Get(":meetingId")
  async getParticipation(@Param('meetingId') meetingId: bigint) {
    try {
      const participation = await this.participationPublicService.getParticipation(meetingId);
      return participation;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        error: 'Failed to get participations.',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createParticipation(

    @Body() participationData: createParticipationDto,
    @Req() request?: Request,
  ) {
    const voterToken = request["voterToken"]

    try {
      const exist = await this.participationPublicService.getParticipationByUserTokenAndTimeId(voterToken,participationData.time.id )
      //i have to check if this participation already exist for dont do post more then 1 time with same info
      if(exist.length==0 || !exist){

        participationData.token = voterToken
    
        await this.participationPublicService.postParticipation(participationData);
        
        const organizerData = await this.meetingsPublicService.getMeeting(participationData.meetingId, participationData.userToken);
        await sendEmail(organizerData[0].userEmail,'Notification of voting in your meeting ' + organizerData[0].title,`Hello, user ${participationData.name} just voted`  )
        await sendEmail(participationData.userEmail,'You have successfully voted in meeting ' + organizerData[0].title,`Hello, user ${participationData.name}, you can view the votes for this meeting or change yours using this link http://localhost:3000/participate/${organizerData[0].token}/${organizerData[0].id}/${voterToken}` )
        return { token: voterToken };
      }else{
        throw new HttpException({
          success: false,
          error: 'Failed to create participation.',
        }, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        error: 'Failed to create participation.',
      }, HttpStatus.BAD_REQUEST);
    }
  }
  @Put()

  async editParticipation(@Req() request: Request, @Body() participationData: createParticipationDto,) {
    try {
      const voterToken = request["voterToken"]
      const answer = await this.participationPublicService.deleteParticipation(participationData.meetingId, voterToken);

      if (answer) {

        try {
    
          for (let i = 0; i < participationData.timesIds.length; i++) {
            participationData.token = voterToken
            participationData.time = participationData.timesIds[i]
            await this.participationPublicService.postParticipation(participationData);
          }
          const organizerData = await this.meetingsPublicService.getMeeting(participationData.meetingId, participationData.userToken);
          await sendEmail(organizerData[0].userEmail,'Notification of voting changes at your meeting ' + organizerData[0].title,`Hello, user ${participationData.name} just changed his vote`)
         
          return { token: voterToken };
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


 
  @Delete(':timeId')
    
  public async deleteParticipationByTimeId(@Param('timeId') timeId: bigint,  @Req() request?: Request) {
    
    try{
      const voterToken = request["voterToken"]
      const answer = await this.participationPublicService.deleteParticipationByTimeId(timeId,voterToken);
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

