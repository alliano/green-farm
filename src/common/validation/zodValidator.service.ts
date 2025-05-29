import { Injectable } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ZodValidator {
  static validate<T>(request: T, schema: ZodType): T {
    return schema.parse(request);
  }
}
