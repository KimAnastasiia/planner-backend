/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { meetings } from 'src/meetings/typeorm/Meetings.entity';
import { Repository } from 'typeorm'
@Injectable()
export class MeetingsPublicService {
    constructor(
        @InjectRepository(meetings)
        private meetingRepository: Repository<meetings>,
    ) { }

    async getMeeting(id: bigint, token:string): Promise<meetings[]> {
        try {
            const meeting = await this.meetingRepository.find({ where: { id: id, token: token, private:false }, relations: ['dates', 'dates.times'], });
            return meeting
        } catch (error) {
            throw new Error('Error in get meeting');
        }

    }
}
