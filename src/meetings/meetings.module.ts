/* eslint-disable prettier/prettier */
import { Module,NestModule,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { MeetingsController } from './controllers/meetings.controller';
import { MeetingsService } from './services/meetings.service';
import { meetings } from './typeorm/Meetings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleAuthorizationMiddleware } from '../googleAuthorizationMiddleware/googleAuthorization.middleware';
@Module({
    imports: [TypeOrmModule.forFeature([meetings])],
    providers: [MeetingsService],
    controllers: [MeetingsController],
})
export class MeetingsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      //consumer.apply(AuthorizationMiddleware).forRoutes('meetings')
  
      consumer.apply(GoogleAuthorizationMiddleware).forRoutes(
          {
            path: "meetings",
            method: RequestMethod.POST
          }
  
        )
     
    }
  }
