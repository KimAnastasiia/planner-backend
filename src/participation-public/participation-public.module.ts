/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ParticipationPublicService } from './services/participation-public.service';
import { ParticipationPublicController } from './controller/participation-public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { participations } from 'src/participation/typeorm/Participation.entity';


@Module({
  imports: [TypeOrmModule.forFeature([participations])],
  controllers: [ParticipationPublicController],
  providers: [ParticipationPublicService,],
})
export class ParticipationPublicModule {}
