import { ErrorResponseDTO } from 'src/dto/common.dto';

export class BadRequestException extends Error {
  private errors: ErrorResponseDTO;
  constructor(message: string) {
    super(message);
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
