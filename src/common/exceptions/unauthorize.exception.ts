import { ErrorResponseDTO } from "src/dto/common.dto";

export class UnauthorizeException extends Error {
    private readonly errors: ErrorResponseDTO;

    constructor(message: string){
        super(message);
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