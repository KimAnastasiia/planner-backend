/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module,NestModule,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { times } from './typeorm/Time.entity';
import { TimesService } from './services/times.service';
import { TimesController } from './controllers/times.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationMiddleware } from 'src/authorizationMiddleware/authorization.middleware';
@Module({
    imports: [TypeOrmModule.forFeature([times])],
    providers: [TimesService],
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
