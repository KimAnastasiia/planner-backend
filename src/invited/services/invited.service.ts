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
          const invitations = await this.invitationsRepository.find({ where: { email }, relations: ['meeting'], });
          return invitations
      }catch(err){
          throw new Error('Failed to get invitations.');
        }
    
    }
}
