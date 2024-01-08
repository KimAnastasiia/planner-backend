/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { dates } from '../typeorm/Date.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'

@Injectable()

export class DateService {

    constructor(
        @InjectRepository(dates)
        private datesRepository: Repository<dates>
    ) { }

    async deleteDate(id: bigint): Promise<any> {
        try {
            const date = await this.datesRepository.find({ where: { id }, relations: ['times', 'times.participations'] });
            await this.datesRepository.remove(date);
            return { success: true };
        } catch (err) {
            console.log(err);
            return { success: false, error: 'Failed to delete date and times and participations.' };
        }
    }
    
}
