import { ErrorResponseDTO } from 'src/dto/common.dto';

export class NorFoundException extends Error {
   private errors: ErrorResponseDTO;
   constructor(message: string) {
      super(message);
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
