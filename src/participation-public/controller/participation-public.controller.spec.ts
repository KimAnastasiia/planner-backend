import { Test, TestingModule } from '@nestjs/testing';
import { ParticipationPublicController } from './participation-public.controller';

describe('ParticipationPublicController', () => {
  let controller: ParticipationPublicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipationPublicController],
    }).compile();

    controller = module.get<ParticipationPublicController>(ParticipationPublicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
