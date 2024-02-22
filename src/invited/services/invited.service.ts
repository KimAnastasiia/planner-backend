/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { invited } from '../typeorm/Invited.entity';
import { Repository } from 'typeorm'
@Injectable()

export class InvitedService {

  constructor(
      @InjectRepository(invited)
      private invitationsRepository: Repository<invited>,
    ) { }
  
    async getInvitations(email:string): Promise<invited[]> {

      try{
          const invitations = await this.invitationsRepository.find({ where: { email }, relations: ['meeting',"meeting.dates" ], });
          return invitations
      }catch(err){
          throw new Error('Failed to get invitations.');
      }
    
    }
    async deleteInvitations(meetingId:bigint, email:string): Promise<{message:string}> {
   
      try {
        const invitations = await this.invitationsRepository.find({ 
          where: {meeting: {id:meetingId}}, 
          relations: ['meeting']});

        if(invitations.length>0){
          if(invitations[0].meeting.userEmail==email){
            invitations
            await this.invitationsRepository.remove(invitations);
            return { message: "done" };
          }else{
            throw new Error('Failed to delete invited, not owner of meeting');
          }
        }else{
          return {message:"didnt find this invitations"}
        }
      } catch (err) {
        throw new Error('Error in delete invited');
      }
    }
}
