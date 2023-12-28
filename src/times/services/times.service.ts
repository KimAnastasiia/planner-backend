/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { times } from '../typeorm/Time.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { addTimesDto } from 'src/dtos/addTimes.dto';

@Injectable()
export class TimesService {
    constructor(
        @InjectRepository(times)
        private timesRepository: Repository<any>,
    ) { }
    async postTimes(timesDetails: addTimesDto): Promise<times> {
        try {
            const result = await this.timesRepository.delete(1);
            const newTime = this.timesRepository.create(timesDetails);
            return await this.timesRepository.save(newTime);
           
        } catch (err) {
            console.log(err);
        }
    }
}
