/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, Delete, HttpStatus, Put, Param, Req, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParticipationPublicService } from '../services/participation-public.service';
import { createParticipationDto } from 'src/dtos/createParticipation.dto';
import { MeetingsPublicService } from 'src/meetings-public/services/meetings-public.service';
import { outlookEmail, transporter } from 'src/utils/emailData';
@Controller('participation-public')
export class ParticipationPublicController {
  constructor(private readonly participationPublicService: ParticipationPublicService,
    private meetingsService: MeetingsPublicService) { }

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
        
        const organizerData = await this.meetingsService.getMeeting(participationData.meetingId, participationData.userToken);

        // Email options
        const mailOptions = {
          from: outlookEmail,
          to: organizerData[0].userEmail,
          subject: 'Notification of voting in your meeting ' + organizerData[0].title,
          text: `Hello, user ${participationData.name} just voted`,
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.error('Error occurred:', error.message);
          }
          console.log('Email sent successfully!', info.response);
        });
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
          const organizerData = await this.meetingsService.getMeeting(participationData.meetingId, participationData.userToken);

          // Email options
          const mailOptions = {
            from: outlookEmail,
            to: organizerData[0].userEmail,
            subject: 'Notification of voting changes at your meeting ' + organizerData[0].title,
            text: `Hello, user ${participationData.name} just changed his vote`,
          };
    
          // Send email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.error('Error occurred:', error.message);
            }
            console.log('Email sent successfully!', info.response);
          });
        

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

