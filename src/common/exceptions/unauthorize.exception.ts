import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorResponseDTO } from "src/dto/common.dto";

export class UnauthorizeException extends HttpException {
    private readonly errors: ErrorResponseDTO;

    constructor(message: string){
        super(message, HttpStatus.UNAUTHORIZED);
        this.errors = {
            message: "Authorization failed",
            errors: [
                {
                    type: "UNAUTHORIZED",
                    message: message
                }
            ]
        }
    }

    public getErrors(): ErrorResponseDTO {
        return this.errors;
    }
}