import { PagingProperties } from "./common.dto";

export class PaginationResponse<T> {
    
    protected message: string;

    protected payload: Array<T>;

    protected properties: PagingProperties

    constructor(payload: Array<T>, properties: PagingProperties){
        this.message = "Berhasil menampilkan data";
        this.payload = payload;
        this.properties = properties;
    }
}

