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

    async getMeeting(id:bigint): Promise<meetings[]> {
        try {
          return await this.meetingRepository.find({ where: { id:id },relations: ['dates', 'dates.times'], });
        } catch (err) {
          console.log(err);
        }
    }
    async getMeetingsByEmail(userEmail:string): Promise<meetings[]> {
        try {
          return await this.meetingRepository.find({ where: { userEmail },relations: ['dates', 'dates.times'], });
        } catch (err) {
          console.log(err);
        }
    }
    async postMeeting(meetingDetails: createMeetingDto): Promise<meetings> {
        try {
            const newMeeting = await this.meetingRepository.create(meetingDetails);
            return await this.meetingRepository.save(newMeeting);
        } catch (err) {
            console.log(err);
        }
    }
}
