/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, Put, Param, Req, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParticipationPublicService } from '../services/participation-public.service';
import { createParticipationDto } from 'src/dtos/createParticipation.dto';

@Controller('participation-public')
export class ParticipationPublicController {
  constructor(private readonly participationPublicService: ParticipationPublicService) { }

  @Get(":meetingId")
  async getMeeting(@Param('meetingId') meetingId: bigint) {
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
    @Req() request?: Request
  ) {
    const voterToken = request["voterToken"]

    try {

      for (let i = 0; i < participationData.timesIds.length; i++) {
        participationData.token = voterToken
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
  @Put()

  async editParticipation (@Req() request: Request, @Body() participationData: createParticipationDto,) {
    try {
      const voterToken = request["voterToken"]
      const answer = await this.participationPublicService.deleteParticipation(participationData.meetingId,voterToken);

      if(answer){
        
        try {

          for (let i = 0; i < participationData.timesIds.length; i++) {
            participationData.token = voterToken
            participationData.time = participationData.timesIds[i]
            await this.participationPublicService.postParticipation(participationData);
          }
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
    
  
  
}

