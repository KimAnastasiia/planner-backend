/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Param, Req,HttpStatus, HttpException  } from '@nestjs/common';
import { ParticipationService } from '../servicies/participation.service';
import { createParticipationDto } from 'src/dtos/createParticipation.dto';
import { Request } from 'express';
@Controller('participation')
export class ParticipationController {

  constructor(private readonly participationService: ParticipationService) { }
  
  @Get(":meetingId")
  async getMeeting(@Param('meetingId') meetingId: bigint,  @Req() request: Request ) {
    const userEmail = request["userEmail"]
    try {
      const participation = await this.participationService.getParticipation(userEmail, meetingId);
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

  async createMeeting(

    @Body() participationData: createParticipationDto,

  ) {

    try {

      for (let i = 0; i < participationData.timesIds.length; i++) {
        participationData.time = participationData.timesIds[i]
        await this.participationService.postParticipation(participationData);
      }
      return { messsage: "done" };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: 'Failed to create participation.',
      }; // Handle errors appropriately
    }
  }
}

