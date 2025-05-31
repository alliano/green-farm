import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { SecurityContextHolder } from '../context/security.context';
import { AUTHOR } from '../context/context';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  @Inject()
  private readonly context: SecurityContextHolder;

  use(req: any, res: any, next: () => void) {
    
    next();
  }
}
