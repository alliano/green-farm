interface CrudOperation<T> {
    create(request: T): Promise<any>;
    update(request: T): Promise<any>;
    delete(request: T): Promise<any>;
    findAll(request: T): Promise<any>;
    findById(request: T): Promise<any>;
}

export interface CrudService<T> extends CrudOperation<T>{}
export interface CrudRepository<T> extends CrudOperation<T>{}