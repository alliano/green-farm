import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { BadRequestException } from '../exceptions/badRequest.exception';
import { UnauthorizeException } from '../exceptions/unauthorize.exception';
import { NorFoundException } from "../exceptions/notfound.exception"
import { ZodError } from 'zod';
import { Response } from 'express';

@Catch(BadRequestException, UnauthorizeException, NorFoundException, ZodError)
export class ErrorFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const respose: Response = host.switchToHttp().getResponse();
    if(exception instanceof BadRequestException){
      respose.status(HttpStatus.BAD_REQUEST).json(exception.getErrors());
    }
    else if(exception instanceof UnauthorizeException){
      respose.status(HttpStatus.UNAUTHORIZED).json(exception.getErrors());
    }
    else if(exception instanceof NorFoundException){
      respose.status(HttpStatus.NOT_FOUND).json(exception.getErrors());
    }
    else if(exception instanceof ZodError){
      respose.status(HttpStatus.BAD_REQUEST).json({
        message: "Validation Error",
        errors: exception.errors.map(e => {
          return {
            type: "BADREQUEST",
            field: e.path[0],
            message: e.message
          }
        })
      })
    }
    else {
      respose.status(500).json({
        message: "INTERNAL SERVER ERROR"
      })
    }
  }
}
