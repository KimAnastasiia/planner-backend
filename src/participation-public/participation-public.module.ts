/* eslint-disable prettier/prettier */
import { Module,NestModule,MiddlewareConsumer} from '@nestjs/common';
import { ParticipationPublicService } from './services/participation-public.service';
import { ParticipationPublicController } from './controller/participation-public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { participations } from 'src/participation/typeorm/Participation.entity';
import { VoterTokenMiddlewareMiddleware } from 'src/voter-token-middleware/voter-token-middleware.middleware';
import { MeetingsPublicService } from 'src/meetings-public/services/meetings-public.service';
import { meetings } from 'src/meetings/typeorm/Meetings.entity';


@Module({
  imports: [TypeOrmModule.forFeature([participations]),TypeOrmModule.forFeature([meetings])],
  providers: [ParticipationPublicService, MeetingsPublicService],
  controllers: [ParticipationPublicController],
})
export class ParticipationPublicModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VoterTokenMiddlewareMiddleware).forRoutes('participation-public')
  }
}
