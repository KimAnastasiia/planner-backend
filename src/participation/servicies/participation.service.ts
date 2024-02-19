/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { participations } from '../typeorm/Participation.entity';
import { Repository } from 'typeorm'
import { createPrivateParticipationDto } from 'src/dtos/createPrivateParticipation.dto';

@Injectable()
export class ParticipationService {

    constructor(
        @InjectRepository(participations)
        private participationRepository: Repository<participations>
    ) { }

    async getParticipation(meetingId): Promise<participations[]> {
        try{
            return await this.participationRepository.find({ where: {meetingId},relations: ['time',"time.date"]});
        }catch(err){
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
    async deleteParticipation(meetingId:bigint, userEmail:string): Promise<any> {
        try {
            const participations = await this.participationRepository.find({ where: {
                meetingId: meetingId,
                userEmail: userEmail
            }});
            await this.participationRepository.remove(participations);
            return { success: true };
        } catch (err) {
            console.log(err);
            throw new Error('Failed to delete participations');
        }
    }
    async deleteParticipationByTimeId(time:bigint, userEmail: string): Promise<any> {
        try {
            const participations = await this.participationRepository.find({ where: { 
                userEmail: userEmail,
                time: {id:time}
            }});
            if(participations){
                await this.participationRepository.remove(participations);
                return { success: true };
            }else{
                throw new Error('Failed to delete participations');
            }
        } catch (err) {
            console.log(err);
            throw new Error('Failed to delete participations');
        }
    }
}
