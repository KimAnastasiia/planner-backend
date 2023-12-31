/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ParticipationService } from '../servicies/participation.service';
import { createParticipationDto } from 'src/dtos/createParticipation.dto';

@Controller('participation')
export class ParticipationController {

  constructor(private readonly participationService: ParticipationService) { }
  @Get()
  async getMeeting(@Query() query) {
    const id = query["meetingId"]
    try {
      const participation = await this.participationService.getParticipation(id);
      return participation;
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: 'Failed to get participation.',
      }; // Handle errors appropriately
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

