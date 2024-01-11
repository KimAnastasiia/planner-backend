import { Module } from '@nestjs/common';
import { ParticipationPublicService } from './services/participation-public.service';

@Module({
  providers: [ParticipationPublicService]
})
export class ParticipationPublicModule {}
