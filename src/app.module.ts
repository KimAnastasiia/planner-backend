/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { users } from './users/typeorm/Users.entity';
import { meetings } from './meetings/typeorm/Meetings.entity';
import { MeetingsModule } from './meetings/meetings.module';
@Module({
  imports: [ 
    TypeOrmModule.forRoot({
    type:'mariadb',
    host:'38.242.239.205',
    port: 3306,
    username:'root2',
    password:"123456qqqqqq",
    database:'planner',
    entities:[users,meetings],
    synchronize:true,
  }), 
  UsersModule, MeetingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
