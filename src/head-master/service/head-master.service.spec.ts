import { Test, TestingModule } from '@nestjs/testing';
import { HeadMasterService } from './head-master.service';

describe('HeadMasterService', () => {
  let service: HeadMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeadMasterService],
    }).compile();

    service = module.get<HeadMasterService>(HeadMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
