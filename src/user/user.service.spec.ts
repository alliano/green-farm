import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CommonModule } from 'src/common/common.module';
import { UserRepository } from './repository/user.repository';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
      imports: [CommonModule]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
