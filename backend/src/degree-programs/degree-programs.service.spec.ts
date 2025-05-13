import { Test, TestingModule } from '@nestjs/testing';
import { DegreeProgramService } from './degree-programs.service';

describe('DegreeProgramsService', () => {
  let service: DegreeProgramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DegreeProgramService],
    }).compile();

    service = module.get<DegreeProgramService>(DegreeProgramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
