import { Module } from '@nestjs/common';
import { ParticipationController } from './controllers/participation.controller';
import { ParticipationService } from './servicies/participation.service';
import { participations } from './typeorm/Participation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([participations])],
  controllers: [ParticipationController],
  providers: [ParticipationService],
})
export class ParticipationModule {}
