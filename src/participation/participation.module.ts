/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ParticipationController } from './controllers/participation.controller';
import { ParticipationService } from './servicies/participation.service';
import { participations } from './typeorm/Participation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationMiddleware } from 'src/authorizationMiddleware/authorization.middleware';
import { meetings } from 'src/meetings/typeorm/Meetings.entity';
import { MeetingsService } from 'src/meetings/services/meetings.service';
@Module({
  imports: [TypeOrmModule.forFeature([participations]),TypeOrmModule.forFeature([meetings]),],
  controllers: [ParticipationController],
  providers: [ParticipationService, MeetingsService],
})
export class ParticipationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(AuthorizationMiddleware).forRoutes('meetings')

    consumer.apply(AuthorizationMiddleware).forRoutes(
        {
          path: "participation/:meetingId",
          method: RequestMethod.GET
        }
      )
   
  }
}
