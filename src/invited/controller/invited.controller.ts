/* eslint-disable prettier/prettier */
import { Controller, Req, Get, HttpStatus, HttpException,Delete,Param } from '@nestjs/common';
import { InvitedService } from '../services/invited.service';

@Controller('invited')
export class InvitedController {

    constructor(private readonly invitedService: InvitedService) { }

    @Get()
    async getMeeting(@Req() request: Request) {
        const email = request["userEmail"]
        try {
            const invitations = await this.invitedService.getInvitations(email);
            return invitations;
        } catch (error) {
        console.error(error);
        throw new HttpException({
            success: false,
            error: 'Failed to get invitations.',
        }, HttpStatus.BAD_REQUEST);
        }
    }
    @Delete('/:meetingId')
    
    public async deleteMeeting(@Param('meetingId') meetingId: bigint, @Req() request?: Request) {
      
      try{
        const userEmail = request["userEmail"]
        return await this.invitedService.deleteInvitationsOfInvated(meetingId, userEmail )
      } catch (error) {
        console.error(error);
        throw new HttpException({
          success: false,
          error: 'Failed to delete meeting.',
        }, HttpStatus.BAD_REQUEST);
      }
    }
}
