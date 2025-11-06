import { Test, TestingModule } from '@nestjs/testing';
import { SchoolRequestController } from './school-request.controller';

describe('SchoolRequestController', () => {
  let controller: SchoolRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolRequestController],
    }).compile();

    controller = module.get<SchoolRequestController>(SchoolRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
