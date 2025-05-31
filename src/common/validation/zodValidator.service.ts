import { Injectable } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ZodValidator {
  public validate<T>(request: T, schema: ZodType): T {
    return schema.parse(request);
  }
}
