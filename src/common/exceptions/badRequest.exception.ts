import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponseDTO } from 'src/dto/common.dto';

export class BadRequestException extends HttpException {
  private errors: ErrorResponseDTO;
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST)
    this.errors = {
      message: 'Request tidak valid',
      errors: [
        {
          type: 'BADREQIEST',
          message: message,
        },
      ],
    };
  }

  public getErrors(): ErrorResponseDTO {
    return this.errors;
  }
}
