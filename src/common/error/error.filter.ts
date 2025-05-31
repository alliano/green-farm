import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { BadRequestException } from '../exceptions/badRequest.exception';
import { UnauthorizeException } from '../exceptions/unauthorize.exception';
import { NorFoundException } from "../exceptions/notfound.exception"
import { ZodError } from 'zod';
import { Response } from 'express';
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';

@Catch(BadRequestException, UnauthorizeException, NorFoundException, ZodError, PrismaClientValidationError, PrismaClientUnknownRequestError, PrismaClientKnownRequestError, HttpException)
export class ErrorFilter<T> implements ExceptionFilter {

  catch(exception: T, host: ArgumentsHost) {
console.log("[ERROR TYPE]", exception)
    const respose: Response = host.switchToHttp().getResponse();
    if(exception instanceof BadRequestException){
      return respose.status(HttpStatus.BAD_REQUEST).json(exception.getErrors());
    }
    else if(exception instanceof UnauthorizeException){
      return respose.status(HttpStatus.UNAUTHORIZED).json(exception.getErrors());
    }
    else if(exception instanceof NorFoundException){
      return respose.status(HttpStatus.NOT_FOUND).json(exception.getErrors());
    }
    else if(exception instanceof PrismaClientUnknownRequestError) {
      return respose.status(HttpStatus.CONFLICT).json({
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
      return respose.status(HttpStatus.CONFLICT).json({
        message: "Duplicate",
        errors: [
          {
            type: "CONFLICT",
            message: exception.message
          }
        ]
      })
    }
    else if(exception instanceof HttpException){
      return respose.status(exception.getStatus()).json(exception.message)
    }
    else if(exception instanceof ZodError) {
      respose.status(400).json({
        message: "Validation Error",
        errors: exception.errors.map(e => ({type: "BADREQUEST", field: e.path[0], message: e.message}))
      })
    }
    else {
      respose.status(500).json({
        message: "INTERNAL SERVER ERROR"
      })
    }
  }
}
