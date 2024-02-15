/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { InvitedController } from './invited.controller';


describe('InvitedController', () => {
  let controller: InvitedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitedController],
    }).compile();

    controller = module.get<InvitedController>(InvitedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
