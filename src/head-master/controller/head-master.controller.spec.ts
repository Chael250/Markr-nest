import { Test, TestingModule } from '@nestjs/testing';
import { HeadMasterController } from './head-master.controller';

describe('HeadMasterController', () => {
  let controller: HeadMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeadMasterController],
    }).compile();

    controller = module.get<HeadMasterController>(HeadMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
