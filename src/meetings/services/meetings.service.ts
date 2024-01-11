/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { meetings } from '../typeorm/Meetings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createMeetingDto } from 'src/dtos/createMeeting.dto';
import { Repository } from 'typeorm'
import { generateRandomToken } from 'src/utils/tokens';


@Injectable()
export class MeetingsService {

  constructor(
    @InjectRepository(meetings)
    private meetingRepository: Repository<meetings>,
  ) { }

  async getMeeting(email:string, id: bigint, token:string): Promise<meetings[]> {

      const meeting= await this.meetingRepository.find({ where: { id: id, token:token }, relations: ['dates', 'dates.times'], });
      if(email==meeting[0].userEmail){
        return meeting
      }else{
        throw new Error('User is not owner of meeting');
      }
  
  }
  async getMeetingsByEmail(userEmail: string): Promise<meetings[]> {
    try {
      return await this.meetingRepository.find({ where: { userEmail }, select: ['id', 'title', 'descriptions', 'location', 'onlineConference', "token"], relations: ['dates', 'dates.times'], });
    } catch (err) {
      console.log(err);
    }
  }

  async updateMeeting(email: string, updateData: createMeetingDto): Promise<meetings> {

    if (email == updateData.userEmail) {

      const existingMeeting = await this.getMeeting(email, updateData.id, updateData.token);
      const curMeeting = existingMeeting[0]

      if (!curMeeting) {
        throw new Error('Meeting not found');
      }

      // Update the meeting properties
      curMeeting.title = updateData.title;
      curMeeting.descriptions = updateData.descriptions;
      curMeeting.location = updateData.location;
      curMeeting.onlineConference = updateData.onlineConference;
      curMeeting.dates = updateData.dates

      // Save the updated meeting
      //await this.meetingRepository.update(String(updateData.id), curMeeting);
      const updatedMeeting = await this.meetingRepository.save(curMeeting);

      return updatedMeeting;
    } else {
      throw new Error('User is not creator of this meeting');
    }
  }
  async postMeeting(meetingDetails: createMeetingDto): Promise<meetings> {
    try {
      const newMeeting = await this.meetingRepository.create(meetingDetails);
      newMeeting.token = generateRandomToken() + String(Date.now())
      return await this.meetingRepository.save(newMeeting);
    } catch (err) {
      console.log(err);
    }
  }
}
