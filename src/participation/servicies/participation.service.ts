/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { participations } from '../typeorm/Participation.entity';
import { Repository } from 'typeorm'
import { MeetingsService } from 'src/meetings/services/meetings.service';
import { createPrivateParticipationDto } from 'src/dtos/createPrivateParticipation.dto';

@Injectable()
export class ParticipationService {

    constructor(
        @InjectRepository(participations)
        private participationRepository: Repository<participations>,
        private meetingsService: MeetingsService
    ) { }

    async getParticipation(userEmail, meetingId, token): Promise<participations[]> {
    
        const meetingDetails = await this.meetingsService.getMeeting(userEmail, meetingId, token);
        if(meetingDetails[0].userEmail==userEmail) {
            return await this.participationRepository.find({ where: {meetingId},relations: ['time',"time.date"]});
        }else{
            throw new Error('Actual user is not the owner of meeting');
        }
        
    }

    async postParticipation(participationDetails: createPrivateParticipationDto): Promise<participations> {
        try {
            const newParticipation = await this.participationRepository.create(participationDetails);
            return await this.participationRepository.save(newParticipation);
        } catch (err) {
            throw new Error('Failed to create participation.');
        }
    }
}
