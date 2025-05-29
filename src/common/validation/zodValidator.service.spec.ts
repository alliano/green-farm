import { Test, TestingModule } from '@nestjs/testing';
import { ZodValidator } from './zodValidator.service';

describe('ValidationService', () => {
  let service: ZodValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZodValidator],
    }).compile();

    service = module.get<ZodValidator>(ZodValidator);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
