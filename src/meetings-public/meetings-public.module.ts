/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MeetingsPublicService } from './services/meetings-public.service';
import { MeetingsPublicController } from './controllers/meetings-public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dates } from 'src/date/typeorm/Date.entity';
import { meetings } from 'src/meetings/typeorm/Meetings.entity';
import { times } from 'src/times/typeorm/Time.entity';
@Module({
  imports: [TypeOrmModule.forFeature([meetings]), TypeOrmModule.forFeature([dates]), TypeOrmModule.forFeature([times])],
  providers: [MeetingsPublicService],
  controllers: [MeetingsPublicController]
})
export class MeetingsPublicModule {}
