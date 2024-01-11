/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { participations } from '../typeorm/Participation.entity';
import { Repository } from 'typeorm'
import { createParticipationDto } from 'src/dtos/createParticipation.dto';
import { MeetingsService } from 'src/meetings/services/meetings.service';

@Injectable()
export class ParticipationService {

    constructor(
        @InjectRepository(participations)
        private participationRepository: Repository<participations>,
        private meetingsService: MeetingsService
    ) { }

    async getParticipation(userEmail, meetingId): Promise<participations[]> {
    
        const meetingDetails = await this.meetingsService.getMeeting(userEmail, meetingId);
        if(meetingDetails[0].userEmail==userEmail) {
            return await this.participationRepository.find({ where: {meetingId},relations: ['time',"time.date"]});
        }else{
            throw new Error('Actual user is not the owner of meeting');
        }
        
    }

    async postParticipation(participationDetails: createParticipationDto): Promise<participations> {
        try {
            const newParticipation = await this.participationRepository.create(participationDetails);
            return await this.participationRepository.save(newParticipation);
        } catch (err) {
            console.log(err);
        }
    }
}
