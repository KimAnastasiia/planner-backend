/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Param, Req,HttpStatus, HttpException  } from '@nestjs/common';
import { ParticipationService } from '../servicies/participation.service';
import { Request } from 'express';
import { createPrivateParticipationDto } from 'src/dtos/createPrivateParticipation.dto';
//import { outlookEmail, transporter } from 'src/utils/emailData';
@Controller('participation')
export class ParticipationController {

  constructor(private readonly participationService: ParticipationService) { }
  
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
        return await this.participationService.postParticipation(participationData);
        /*
        const organizerData = await this.meetingsService.getMeeting(participationData.meetingId, participationData.userToken);

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
        */
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        error: 'Failed to create participation.',
      }, HttpStatus.BAD_REQUEST);
    }
  }
}

