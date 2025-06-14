import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponseDTO } from 'src/dto/common.dto';

export class NotFoundException extends HttpException {
   private errors: ErrorResponseDTO;
   constructor(message: string) {
      super(message, HttpStatus.NOT_FOUND);
      this.errors = {
         message: 'Data tidak ditemukan',
         errors: [
            {
               message: message,
               type: 'NOTFOUND',
            },
         ],
      };
   }

   public getErrors(): ErrorResponseDTO {
      return this.errors;
   }
}
