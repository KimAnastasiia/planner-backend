import { Test, TestingModule } from '@nestjs/testing';
import { SelectedTimesController } from './selected-times.controller';

describe('SelectedTimesController', () => {
  let controller: SelectedTimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectedTimesController],
    }).compile();

    controller = module.get<SelectedTimesController>(SelectedTimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
