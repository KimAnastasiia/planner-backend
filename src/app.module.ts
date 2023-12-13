/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { users } from './users/typeorm/User.entity';
@Module({
  imports: [ 
    TypeOrmModule.forRoot({
    type:'mariadb',
    host:'38.242.239.205',
    port: 3306,
    username:'root2',
    password:"123456qqqqqq",
    database:'planner',
    entities:[users],
    synchronize:true,
  }), 
  UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
