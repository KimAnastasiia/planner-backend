/* eslint-disable prettier/prettier */
import { Controller, Req, Get, HttpStatus, HttpException } from '@nestjs/common';
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
}
