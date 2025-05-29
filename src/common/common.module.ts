import { Global, Module } from '@nestjs/common';
import { Database } from './database/database';
import { ZodValidator } from './validation/zodValidator.service';

@Global()
@Module({
  providers: [Database, ZodValidator]
})
export class CommonModule {}
