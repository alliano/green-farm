import { Global, Module } from '@nestjs/common';
import { Database } from './database/database';
import { ZodValidator } from './validation/zodValidator.service';
import { SecurityContextHolder } from './context/security.context';

@Global()
@Module({
  providers: [Database, ZodValidator, SecurityContextHolder],
  exports: [Database, ZodValidator, SecurityContextHolder]
})
export class CommonModule {}
