/* eslint-disable prettier/prettier */
// database/database.module.ts
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { GoogleAuthorizationMiddleware } from '../googleAuthorizationMiddleware/googleAuthorization.middleware';
import { users } from './typeorm/Users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([users])],
  providers: [UsersService],
  controllers: [UsersController],
})

export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(AuthorizationMiddleware).forRoutes('users')

    consumer.apply(GoogleAuthorizationMiddleware).forRoutes(
        {
          path: "users",
          method: RequestMethod.POST
        }

      )
   
  }
}
