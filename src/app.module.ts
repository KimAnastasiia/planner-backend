/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { SelectedTimesService } from './selected-times/services/selected-times.service';
import { SelectedTimesModule } from './selected-times/selected-times.module';
@Module({
  imports: [ 
    TypeOrmModule.forRoot({
    type:'mariadb',
    host:'38.242.239.205',
    port: 3306,
    username:'root2',
    password:"123456qqqqqq",
    database:'planner',
    entities:[users,meetings,dates,times],
    synchronize:true,
  }), 
  UsersModule, MeetingsModule, DateModule, SelectedTimesModule],
  controllers: [AppController],
  providers: [AppService, SelectedTimesService],
})
export class AppModule {}
