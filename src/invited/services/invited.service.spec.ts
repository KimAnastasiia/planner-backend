import { Test, TestingModule } from '@nestjs/testing';
import { InvitedService } from './invited.service';

describe('InvitedService', () => {
  let service: InvitedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitedService],
    }).compile();

    service = module.get<InvitedService>(InvitedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
