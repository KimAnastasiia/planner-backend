/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { users } from './users/typeorm/Users.entity';
import { meetings } from './meetings/typeorm/Meetings.entity';
import { MeetingsModule } from './meetings/meetings.module';
import { DateModule } from './date/date.module';
import { dates } from './date/typeorm/Date.entity';
import { times } from './times/typeorm/Time.entity';
import { ParticipationModule } from './participation/participation.module';
import { participations } from './participation/typeorm/Participation.entity';
import { TimesModule } from './times/times.module';
import { ParticipationPublicModule } from './participation-public/participation-public.module';
import { MeetingsPublicModule } from './meetings-public/meetings-public.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
    type:'mariadb',
    host:'127.0.0.1',
    port: 3306,
    username:'root',
    password:"1234",
    database:'planner',
    entities:[users,meetings,dates,times, participations],
    synchronize:true,
  }), 
  UsersModule, MeetingsModule, DateModule, ParticipationModule, TimesModule, ParticipationPublicModule, MeetingsPublicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
