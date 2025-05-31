import { Inject, Injectable } from '@nestjs/common';
import { Auth } from 'src/common/interfaces/auth.terfaces';
import { ZodValidator } from 'src/common/validation/zodValidator.service';
import { LoginRequestDTO, TokenResponseDTO, RefreshTokenRequestDTO } from 'src/dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { AuthValidation } from '../auth.validation';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { UnauthorizeException } from 'src/common/exceptions/unauthorize.exception';
import { SecurityContextHolder } from 'src/common/context/security.context';
import { AUTHOR } from 'src/common/context/context';

@Injectable()
export class AuthService implements Auth {


    @Inject()
    private readonly userService: UserService;

    @Inject()
    private readonly securityContextHolder: SecurityContextHolder;

    @Inject()
    private readonly jwtService: JwtService;

    @Inject()
    private readonly zodValidator: ZodValidator;

    public async login(request: LoginRequestDTO): Promise<TokenResponseDTO> {
        const validReuest: LoginRequestDTO = this.zodValidator.validate<LoginRequestDTO>(request, AuthValidation.LOGIN);
        const user: User = await this.userService.findByEmail(validReuest.email);
        const isValidPassword = await bcrypt.compare(validReuest.password, user.password);
        if(!isValidPassword){
            throw new UnauthorizeException("email atau password tidak valid!")
        }
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync({
                email: user.email,
                role: user.role
            }),
            this.jwtService.signAsync({
                emai: user.email,
                role: user.role
            },{
                algorithm: "HS256",
                secret: process.env.JWT_REFRESH_SECREET,
                expiresIn: "20m"
            })
        ]);
        this.securityContextHolder.setContext<User>(AUTHOR, user)
        return {
            access_token,
            refresh_token
        };
    }
    public async resfreshToken(request: RefreshTokenRequestDTO): Promise<TokenResponseDTO> {
        throw new Error('Method not implemented.');
    }

}
