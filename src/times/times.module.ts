/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module,NestModule,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { times } from './typeorm/Time.entity';
import { TimesService } from './services/times.service';
import { TimesController } from './controllers/times.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationMiddleware } from 'src/authorizationMiddleware/authorization.middleware';
import { ParticipationService } from 'src/participation/servicies/participation.service';
import { participations } from 'src/participation/typeorm/Participation.entity';
@Module({
    imports: [TypeOrmModule.forFeature([times]),TypeOrmModule.forFeature([participations])],
    providers: [TimesService, ParticipationService],
    controllers: [TimesController],
})
export class TimesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        //consumer.apply(AuthorizationMiddleware).forRoutes('times')

        consumer.apply(AuthorizationMiddleware).forRoutes(
            {
              path: "times",
              method: RequestMethod.DELETE
            }
    
          )
   
       
      }
}
