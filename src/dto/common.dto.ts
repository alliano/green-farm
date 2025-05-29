export interface DTO {}

export interface FindAllDto {
  limit?: string;
  offset?: string;
  search?: string;
  order_by?: string;
}


export interface ResponseData<T> {
    message: string;
    payload?: T
}



export interface PaginationResult<T> extends ResponseData<T> {
  payload: T;
  properties: PagingProperties;
}

type PagingProperties = {
  page: number;
  page_size: number;
  total_page: number;
  total_item: number;
};


export type ErrorResponseDTO = {
    message: string;
    errors: Array<ErrorDetail>
}

type ErrorDetail = {
    type: string;
    message: string;
}

