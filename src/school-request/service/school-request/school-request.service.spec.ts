import { Test, TestingModule } from '@nestjs/testing';
import { SchoolRequestService } from './school-request.service';

describe('SchoolRequestService', () => {
  let service: SchoolRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolRequestService],
    }).compile();

    service = module.get<SchoolRequestService>(SchoolRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
