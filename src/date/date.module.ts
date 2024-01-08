/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module,NestModule,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationMiddleware } from 'src/authorizationMiddleware/authorization.middleware';
import { dates } from './typeorm/Date.entity';
import { DateService } from './services/date.service';
import { DateController } from './controllers/date.controller';
import { TimesService } from 'src/times/services/times.service';
import { times } from 'src/times/typeorm/Time.entity';


@Module({
    imports: [TypeOrmModule.forFeature([dates]),TypeOrmModule.forFeature([times]) ],
    providers: [DateService, TimesService ],
    controllers: [DateController ],
})
export class DateModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      //consumer.apply(AuthorizationMiddleware).forRoutes('meetings')

      consumer.apply(AuthorizationMiddleware).forRoutes(
          {
            path: "dates",
            method: RequestMethod.DELETE
          }
  
        )

    }
  }{

}
