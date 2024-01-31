/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, Param, Req, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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
    async createParticipation(
      @Body() participationData: createParticipationDto,
      @Req() request: Request
    ) {
      const voterToken = request["voterToken"]
      
      try {
  
        for (let i = 0; i < participationData.timesIds.length; i++) {
          participationData.token=voterToken
          participationData.time = participationData.timesIds[i]
          await this.participationPublicService.postParticipation(participationData);
        }
        return { token: voterToken };
      } catch (error) {
        console.error(error);
        throw new HttpException({
          success: false,
          error: 'Failed to create participation.',
        }, HttpStatus.BAD_REQUEST);
      }
    }
}

