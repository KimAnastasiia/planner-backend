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

    async deleteTime(id: bigint): Promise<any> {
        try {
            const time = await this.timesRepository.find({ where: { id }, relations: ['participations'] });
            await this.timesRepository.remove(time);
            return { success: true };
        } catch (err) {
            console.log(err);
            return { success: false, error: 'Failed to delete time and participations.' };
        }
    }
}
