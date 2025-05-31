import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { BadRequestException } from '../exceptions/badRequest.exception';
import { UnauthorizeException } from '../exceptions/unauthorize.exception';
import { NorFoundException } from "../exceptions/notfound.exception"
import { ZodError } from 'zod';
import { Response } from 'express';
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';

@Catch(BadRequestException, UnauthorizeException, NorFoundException, ZodError, PrismaClientValidationError, PrismaClientUnknownRequestError, PrismaClientKnownRequestError)
export class ErrorFilter<T> implements ExceptionFilter {

  catch(exception: T, host: ArgumentsHost) {

    console.log("[ERROR JENIS]", exception)

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
    else if(exception instanceof PrismaClientUnknownRequestError) {
      respose.status(HttpStatus.CONFLICT).json({
        message: "Duplicate",
        errors: [
          {
            type: "CONFLICT",
            message: exception.message
          }
        ]
      })
    }
    else if(exception instanceof PrismaClientKnownRequestError) {
      respose.status(HttpStatus.CONFLICT).json({
        message: "Duplicate",
        errors: [
          {
            type: "CONFLICT",
            message: exception.message
          }
        ]
      })
    }
    else {
      respose.status(500).json({
        message: "INTERNAL SERVER ERROR"
      })
    }
  }
}
