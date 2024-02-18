/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Param, Req,HttpStatus, HttpException  } from '@nestjs/common';
import { ParticipationService } from '../servicies/participation.service';
import { Request } from 'express';
import { createPrivateParticipationDto } from 'src/dtos/createPrivateParticipation.dto';
import { MeetingsService } from 'src/meetings/services/meetings.service';
import { outlookEmail, transporter } from 'src/utils/emailData';
@Controller('participation')
export class ParticipationController {

  constructor(private readonly participationService: ParticipationService,
    private meetingsService:MeetingsService) { }
  
  @Get(":meetingId/:token")
  async getParticipation(@Param('meetingId') meetingId: bigint, @Param('token') token: string,  @Req() request: Request ) {
    const userEmail = request["userEmail"]
    try {
      const participation = await this.participationService.getParticipation(userEmail, meetingId,token);
      return participation;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        error: 'Failed to verificate user.',
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

        const organizerData = await this.meetingsService.getMeetingById(participationData.meetingId);
        const invited= organizerData[0].invited.find((i)=>i.email==userEmail)
        if(invited){
          const newParticipation = await this.participationService.postParticipation(participationData);
          // Email options
          const mailOptions = {
            from: outlookEmail,
            to: organizerData[0].userEmail,
            subject: 'Notification of voting in your meeting ' + organizerData[0].title,
            text: `Hello, user ${participationData.name} just voted`,
        
          }
          // Send email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.error('Error occurred:', error.message);
            }
            console.log('Email sent successfully!', info.response);
          })

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
}

