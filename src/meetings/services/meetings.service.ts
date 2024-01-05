/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { meetings } from '../typeorm/Meetings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createMeetingDto } from 'src/dtos/createMeeting.dto';
import { Repository } from 'typeorm'
import { MeetingUpdateDto } from 'src/dtos/meetingUpdate.dto';


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
    
    async updateMeeting(updateData: MeetingUpdateDto): Promise<meetings> {
   
      const existingMeeting = await this.getMeeting(updateData.id);
      const curMeeting = existingMeeting[0]
      if (!curMeeting) {
        throw new Error('Meeting not found');
      }
  
      // Update the meeting properties
      curMeeting.title = updateData.title;
      curMeeting.descriptions = updateData.descriptions;
      curMeeting.location = updateData.location;
      curMeeting.onlineConference = updateData.onlineConference;
  
      // Save the updated meeting
      const updatedMeeting = await this.meetingRepository.save(curMeeting);
  
      return updatedMeeting;
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
