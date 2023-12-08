/* eslint-disable prettier/prettier */
// database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';
import { users } from './typeorm/User.entity';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([users])],
  providers: [UsersService],
  controllers: [UsersController],
})

export class UsersModule {}
