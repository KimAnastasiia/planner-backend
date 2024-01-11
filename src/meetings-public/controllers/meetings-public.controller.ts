/* eslint-disable prettier/prettier */
import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { MeetingsPublicService } from '../services/meetings-public.service';

@Controller('meetings-public')
export class MeetingsPublicController {
    constructor(private readonly meetingsPublicService: MeetingsPublicService) { }
    @Get()
    async getMeeting(@Query() query) {
      const id = query["meetingId"]
      const token = query["token"]
      try {
        const meeting = await this.meetingsPublicService.getMeeting(id, token);
        return meeting;
      } catch (error) {
        console.error(error);
        throw new HttpException({
          success: false,
          error: 'Failed to get meeting.',
        }, HttpStatus.BAD_REQUEST);
      }
    }
}
