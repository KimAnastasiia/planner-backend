/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { dates } from '../typeorm/Date.entity';
import { createDate } from 'src/dtos/createDate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { TimesService } from 'src/times/services/times.service';
@Injectable()

export class DateService {

    constructor(
        private readonly timesService: TimesService,
        @InjectRepository(dates)
        private dateRepository: Repository<dates>
    ) { }

    async postDate(datesDetails: createDate): Promise<any> {

        try {

            for (let i = 0; i < datesDetails.datesArray.length; i++) {

                const forDate = {
                    date: datesDetails.datesArray[i].day,
                    idMeeting:{}
                }
                let inertedDate

                try {
                    const newDate = this.dateRepository.create(forDate);
                    inertedDate = await this.dateRepository.save(newDate);
                } catch (err) {
                    console.log(err);
                }

                for (let b = 0; b < datesDetails.datesArray[i]?.times.length; b++) {
                 
                    const forTime = {
                        idDate: BigInt(inertedDate.id),
                        idMeeting: BigInt(datesDetails.meetingId),
                        time: String(datesDetails.datesArray[i].times[b].time)
                    }

                    try {
                        const newTime = await this.timesService.postTimes(forTime);
           
                    } catch (err) {
                        console.log(err);
                    }

                }

            }

        } catch (err) {
            console.log(err);
        }
    }
}
