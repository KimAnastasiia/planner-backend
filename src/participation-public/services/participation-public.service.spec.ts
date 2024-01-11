import { Test, TestingModule } from '@nestjs/testing';
import { ParticipationPublicService } from './participation-public.service';

describe('ParticipationPublicService', () => {
  let service: ParticipationPublicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipationPublicService],
    }).compile();

    service = module.get<ParticipationPublicService>(ParticipationPublicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
