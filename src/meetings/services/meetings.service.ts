/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { meetings } from '../typeorm/Meetings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createMeetingDto } from 'src/dtos/createMeeting.dto';
import { Repository } from 'typeorm'


@Injectable()
export class MeetingsService {

    constructor(
        @InjectRepository(meetings)
        private meetingRepository: Repository<meetings>,
    ) { }

    async postMeeting(meetingDetails: createMeetingDto): Promise<meetings> {
        try {
            const newMeeting = await this.meetingRepository.create(meetingDetails);
            return await this.meetingRepository.save(newMeeting);
        } catch (err) {
            console.log(err);
        }
    }
}
