/* eslint-disable prettier/prettier */
import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { invited } from './typeorm/Invited.entity';
import { meetings } from 'src/meetings/typeorm/Meetings.entity';
import { InvitedService } from './services/invited.service';
import { InvitedController } from './controller/invited.controller';
import { AuthorizationMiddleware } from 'src/authorizationMiddleware/authorization.middleware';
@Module({
    imports: [TypeOrmModule.forFeature([invited]), TypeOrmModule.forFeature([meetings])],
    providers: [InvitedService],
    controllers: [InvitedController]})

export class InvitedModule  implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthorizationMiddleware).forRoutes('invited')
    }
}
