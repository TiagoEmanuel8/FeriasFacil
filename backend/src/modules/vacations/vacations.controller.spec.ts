import { Test, TestingModule } from '@nestjs/testing';
import { VacationsController } from './vacations.controller';
import { VacationsService } from './vacations.service';

describe('VacationsController', () => {
  let controller: VacationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacationsController],
      providers: [VacationsService],
    }).compile();

    controller = module.get<VacationsController>(VacationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
