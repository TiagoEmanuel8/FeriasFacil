import { Test, TestingModule } from '@nestjs/testing';
import { VacationsService } from './vacations.service';

describe('VacationsService', () => {
  let service: VacationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacationsService],
    }).compile();

    service = module.get<VacationsService>(VacationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
