/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { participations } from '../typeorm/Participation.entity';
import { Repository } from 'typeorm'
import { createParticipationDto } from 'src/dtos/createParticipation.dto';

@Injectable()
export class ParticipationService {

    constructor(
        @InjectRepository(participations)
        private participationRepository: Repository<participations>,
    ) { }

    async getParticipation(meeting:bigint): Promise<participations[]> {
        try {
          return await this.participationRepository.find({ where: {meeting},relations: ['date', 'time',"meeting"], });
        } catch (err) {
          console.log(err);
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
