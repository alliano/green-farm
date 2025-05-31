import { z } from 'zod';

export class AuthValidation {
   static LOGIN = z.object({
      email: z
         .string({ required_error: 'email tidak boleh kosong' })
         .email({ message: 'email tidak valid' }),
      password: z.string({ required_error: 'password tidak boleh kosong' }),
   });
}
