import { FindAllDto } from "src/dto/common.dto";

interface CrudOperation<T> {
    create(request: T): Promise<any>;
    update(request: T): Promise<any>;
    delete(uuid: T): Promise<any>;
    findAll(request: FindAllDto): Promise<any>;
    findByUuid(uuid: string): Promise<any>;
}

export interface CrudService<T> extends CrudOperation<T>{}
export interface CrudRepository<T> extends CrudOperation<T>{}