import { Test, TestingModule } from '@nestjs/testing';
import { MeetingsPublicService } from './meetings-public.service';

describe('MeetingsPublicService', () => {
  let service: MeetingsPublicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetingsPublicService],
    }).compile();

    service = module.get<MeetingsPublicService>(MeetingsPublicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
