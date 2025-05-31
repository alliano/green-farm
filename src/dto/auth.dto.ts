import { DTO } from './common.dto';

export interface LoginRequestDTO extends DTO {
   email: string;
   password: string;
}

export interface TokenResponseDTO extends DTO {
   access_token: string;
   refresh_token: string;
}

export interface RefreshTokenRequestDTO {
   access_token: string;
   refresh_token: string;
}
