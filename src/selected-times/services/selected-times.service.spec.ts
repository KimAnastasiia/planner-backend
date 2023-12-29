import { Test, TestingModule } from '@nestjs/testing';
import { SelectedTimesService } from './selected-times.service';

describe('SelectedTimesService', () => {
  let service: SelectedTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectedTimesService],
    }).compile();

    service = module.get<SelectedTimesService>(SelectedTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
