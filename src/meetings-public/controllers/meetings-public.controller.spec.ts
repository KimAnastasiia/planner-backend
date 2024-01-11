import { Test, TestingModule } from '@nestjs/testing';
import { MeetingsPublicController } from './meetings-public.controller';

describe('MeetingsPublicController', () => {
  let controller: MeetingsPublicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetingsPublicController],
    }).compile();

    controller = module.get<MeetingsPublicController>(MeetingsPublicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
