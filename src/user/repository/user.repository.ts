import { Inject, Injectable } from '@nestjs/common';
import { Database } from 'src/common/database/database';
import { CrudRepository } from 'src/common/interfaces/crud.interface';
import { DTO } from 'src/dto/common.dto';

@Injectable()
export class UserRepository implements CrudRepository<DTO>{

    @Inject()
    private readonly database: Database;

    create(request: DTO): Promise<any> {
        throw new Error('Method not implemented.');
    }
    update(request: DTO): Promise<any> {
        throw new Error('Method not implemented.');
    }
    delete(request: DTO): Promise<any> {
        throw new Error('Method not implemented.');
    }
    findAll(request: DTO): Promise<any> {
        throw new Error('Method not implemented.');
    }
    findById(request: DTO): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
