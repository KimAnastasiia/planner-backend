/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createParticipationDto } from 'src/dtos/createParticipation.dto';
import { participations } from 'src/participation/typeorm/Participation.entity';
import { Repository } from 'typeorm'
@Injectable()
export class ParticipationPublicService {

    constructor(
        @InjectRepository(participations)
        private participationPublicRepository: Repository<participations>,
    ) { }

    async getParticipation(meetingId:bigint): Promise<participations[]> {
        try {
            return await this.participationPublicRepository.find({ where: {meetingId},relations: ['time',"time.date"]});
        } catch (error) {
            throw new Error('error in get participations');
        }

    }
    async getParticipationByUserTokenAndTimeId(token:string, timeId:bigint): Promise<participations[]> {
        try {
            return await this.participationPublicRepository.find({ where: {token, time:{id:timeId}},relations: ['time']});
        } catch (error) {
            throw new Error('error in get participations');
        }

    }
    async postParticipation(participationDetails: createParticipationDto): Promise<participations> {
        try {
            const newParticipation = await this.participationPublicRepository.create(participationDetails);
            return await this.participationPublicRepository.save(newParticipation);
        } catch (err) {
            console.log(err);
            throw new Error('error in post participations');
        }
    }
    async deleteParticipation(meetingId:bigint, token: string): Promise<any> {
        try {
            const participations = await this.participationPublicRepository.find({ where: { 
                token: token,
                meetingId: meetingId 
            }});
            await this.participationPublicRepository.remove(participations);
            return { success: true };
        } catch (err) {
            console.log(err);
            throw new Error('Failed to delete participations');
        }
    }
    async deleteParticipationByTimeId(time:bigint, token: string): Promise<any> {
        try {
            const participations = await this.participationPublicRepository.find({ where: { 
                token: token,
                time: {id:time}
            }});
            if(participations){
                await this.participationPublicRepository.remove(participations);
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
