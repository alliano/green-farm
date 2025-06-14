import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from 'src/common/interfaces/crud.interface';
import { DTO, FindAllDto, PaginationResult } from 'src/dto/common.dto';
import { RegisterRequestDto, UpdateUserRequestDto } from 'src/dto/user.dto';
import { UserRepository } from './repository/user.repository';
import { ZodValidator } from 'src/common/validation/zodValidator.service';
import { UserValidation } from './userValidation.schema';
import { User } from '@prisma/client';
import * as bcrypt from "bcrypt";
@Injectable()
export class UserService implements CrudService<DTO> {

    @Inject()
    private readonly userRepository: UserRepository;

    @Inject()
    private readonly zodValidatorService: ZodValidator;

    async create(request: RegisterRequestDto): Promise<void> {
        const validRequest: RegisterRequestDto = this.zodValidatorService.validate<RegisterRequestDto>(request, UserValidation.REGISTER);
        validRequest.password = await bcrypt.hash(validRequest.password, 10);
        await this.userRepository.create(validRequest);
    }


    async update(request: UpdateUserRequestDto): Promise<any> {
        const validRequest: UpdateUserRequestDto = this.zodValidatorService.validate<UpdateUserRequestDto>(request, UserValidation.UPDATE);
        const isExist: User = await this.userRepository.findByUuid(request.uuid);
        if(!isExist) {
            throw new NotFoundException(`user dengan uuid ${request.uuid} tidak ditemukan`)
        }

        await this.userRepository.update({...isExist, ...validRequest});
    }


    async delete(uuid: string): Promise<any> {
        await this.userRepository.delete(uuid)
    }


    async findAll(request: FindAllDto): Promise<PaginationResult<User>> {
        return await this.userRepository.findAll(request);
    }


    async findByUuid(uuid: string): Promise<User> {
        const user: User | null = await this.userRepository.findByUuid(uuid);
        if(!user){
            throw new NotFoundException(`user dengan uuid ${uuid} tidak ditemukan`)
        }
        return user;
    }

    public async findByEmail(email: string): Promise<User> {
        const user: User = await this.userRepository.findByEmail(email);
        if(!user) {
            throw new NotFoundException(`email ${email} tidak ditemukan`);
        }
        return user;
    }
    
}
