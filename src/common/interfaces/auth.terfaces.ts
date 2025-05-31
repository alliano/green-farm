import { LoginRequestDTO, RefreshTokenRequestDTO, TokenResponseDTO } from "src/dto/auth.dto";

export interface Auth {
    login(request: LoginRequestDTO): Promise<TokenResponseDTO>;

    resfreshToken(request: RefreshTokenRequestDTO): Promise<TokenResponseDTO>

    
}