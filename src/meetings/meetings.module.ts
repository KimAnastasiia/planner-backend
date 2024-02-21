/* eslint-disable prettier/prettier */
import { Module,NestModule,MiddlewareConsumer} from '@nestjs/common';
import { MeetingsController } from './controllers/meetings.controller';
import { MeetingsService } from './services/meetings.service';
import { meetings } from './typeorm/Meetings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationMiddleware } from 'src/authorizationMiddleware/authorization.middleware';
import { DateService } from 'src/date/services/date.service';
import { dates } from 'src/date/typeorm/Date.entity';
import { TimesService } from 'src/times/services/times.service';
import { times } from 'src/times/typeorm/Time.entity';
import { InvitedService } from 'src/invited/services/invited.service';
import { invited } from 'src/invited/typeorm/Invited.entity';
import { ParticipationService } from 'src/participation/servicies/participation.service';
import { participations } from 'src/participation/typeorm/Participation.entity';


@Module({
    imports: [TypeOrmModule.forFeature([meetings]), TypeOrmModule.forFeature([dates]), TypeOrmModule.forFeature([times]),TypeOrmModule.forFeature([invited]),TypeOrmModule.forFeature([participations])],
    providers: [MeetingsService, DateService, TimesService, InvitedService, ParticipationService],
    controllers: [MeetingsController],
})
export class MeetingsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthorizationMiddleware).forRoutes('meetings')
    }
  }
