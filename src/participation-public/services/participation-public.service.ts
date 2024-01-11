/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createParticipationDto } from 'src/dtos/createParticipation.dto';
import { participations } from 'src/participation/typeorm/Participation.entity';
import { participationPublic } from '../typeorm/participation-public.entity';
import { Repository } from 'typeorm'
@Injectable()
export class ParticipationPublicService {

    constructor(
        @InjectRepository(participations)
        private participationRepository: Repository<participationPublic>,
    ) { }

    async getParticipation(meetingId:bigint): Promise<participationPublic[]> {

        return await this.participationRepository.find({ where: {meetingId},relations: ['time',"time.date"]});

    }

    async postParticipation(participationDetails: createParticipationDto): Promise<participationPublic> {
        try {
            const newParticipation = await this.participationRepository.create(participationDetails);
            return await this.participationRepository.save(newParticipation);
        } catch (err) {
            console.log(err);
        }
    }
}
