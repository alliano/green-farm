import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { Database } from 'src/common/database/database';

describe('Repository', () => {
  let provider: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
      imports: [Database]
    }).compile();

    provider = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
