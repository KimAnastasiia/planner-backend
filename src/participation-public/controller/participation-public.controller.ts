/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParticipationPublicService } from '../services/participation-public.service';
import { createParticipationDto } from 'src/dtos/createParticipation.dto';

@Controller('participation-public')
export class ParticipationPublicController {
    constructor(private readonly participationPublicService: ParticipationPublicService) { }
  
    @Get(":meetingId")
    async getMeeting(@Param('meetingId') meetingId: bigint ) {
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
  
    async createMeeting(
  
      @Body() participationData: createParticipationDto,
  
    ) {
  
      try {
  
        for (let i = 0; i < participationData.timesIds.length; i++) {
          participationData.time = participationData.timesIds[i]
          await this.participationPublicService.postParticipation(participationData);
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

