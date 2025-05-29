import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'src/common/database/database';
import { CrudService } from 'src/common/interfaces/crud.interface';
import { DTO, FindAllDto } from 'src/dto/common.dto';
import { RegisterRequestDto, UpdateUserRequestDto } from 'src/dto/user.dto';
import { UserRepository } from './repository/user.repository';
import { ZodValidator } from 'src/common/validation/zodValidator.service';
import { UserValidation } from './userValidation.schema';
import { User } from '@prisma/client';

@Injectable()
export class UserService implements CrudService<DTO> {

    @Inject()
    private readonly userRepository: UserRepository;

    async create(request: RegisterRequestDto): Promise<void> {
        const validRequest: RegisterRequestDto = ZodValidator.validate<RegisterRequestDto>(request, UserValidation.REGISTER);
        await this.userRepository.create(validRequest);
    }
    async update(request: UpdateUserRequestDto): Promise<any> {
        const validRequest: UpdateUserRequestDto = ZodValidator.validate<UpdateUserRequestDto>(request, UserValidation.UPDATE);
        const isExist: User = await this.userRepository.findByUuid(request.uuid);
        if(!isExist) {
            throw new NotFoundException(`user dengan uuid ${request.uuid} tidak ditemukan`)
        }

        await this.userRepository.update({...isExist, ...validRequest});
    }
    async delete(request: DTO): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async findAll(request: FindAllDto): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async findByUuid(request: string): Promise<any> {
        throw new Error('Method not implemented.');
    }

    @Inject()
    private readonly userRepostory: UserRepository;
    
}
