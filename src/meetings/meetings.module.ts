/* eslint-disable prettier/prettier */
import { Module,NestModule,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { MeetingsController } from './controllers/meetings.controller';
import { MeetingsService } from './services/meetings.service';
import { meetings } from './typeorm/Meetings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationMiddleware } from 'src/authorizationMiddleware/authorization.middleware';
import { DateService } from 'src/date/services/date.service';
import { dates } from 'src/date/typeorm/Date.entity';
import { TimesService } from 'src/times/services/times.service';
import { times } from 'src/times/typeorm/Time.entity';


@Module({
    imports: [TypeOrmModule.forFeature([meetings]), TypeOrmModule.forFeature([dates]), TypeOrmModule.forFeature([times])],
    providers: [MeetingsService, DateService, TimesService],
    controllers: [MeetingsController],
})
export class MeetingsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      //consumer.apply(AuthorizationMiddleware).forRoutes('meetings')
  
      consumer.apply(AuthorizationMiddleware).forRoutes(
          {
            path: "meetings",
            method: RequestMethod.POST
          },
          {
            path: "meetings/list",
            method: RequestMethod.GET
          }
  
  
        )
     
    }
  }
