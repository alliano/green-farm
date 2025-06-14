import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { BadRequestException } from '../exceptions/badRequest.exception';
import { UnauthorizeException } from '../exceptions/unauthorize.exception';
import { NotFoundException } from '../exceptions/notfound.exception';
import { ZodError } from 'zod';
import { Response } from 'express';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

@Catch(
   BadRequestException,
   UnauthorizeException,
   ZodError,
   PrismaClientValidationError,
   Prisma.PrismaClientUnknownRequestError,
   Prisma.PrismaClientKnownRequestError,
   HttpException,
)
export class ErrorFilter<T> implements ExceptionFilter {
   public catch(exception: T, host: ArgumentsHost): void {
      console.log('[ERROR TYPE]', exception instanceof PrismaClientKnownRequestError);
      const respose: Response = host.switchToHttp().getResponse();
      if (exception instanceof BadRequestException) {
         respose.status(HttpStatus.BAD_REQUEST).json(exception.getErrors());
      } else if (exception instanceof UnauthorizeException) {
         respose.status(HttpStatus.UNAUTHORIZED).json(exception.getErrors());
      } else if (exception instanceof NotFoundException) {
         respose.status(HttpStatus.NOT_FOUND).json(exception.getErrors());
      } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
         respose.status(HttpStatus.CONFLICT).json({
            message: 'Duplicate',
            errors: [
               {
                  type: 'CONFLICT',
                  message: exception,
               },
            ],
         });
      } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
         respose.status(HttpStatus.CONFLICT).json({
            message: 'Duplicate',
            errors: [
               {
                  type: 'CONFLICT',
                  message: `${exception.meta?.target[0]} must be unique`,
               },
            ],
         });
      } else if (exception instanceof HttpException) {
         respose.status(exception.getStatus()).json(exception.message);
      } else if (exception instanceof ZodError) {
         respose.status(400).json({
            message: 'Validation Error',
            errors: exception.errors.map((e) => ({
               type: 'BADREQUEST',
               field: e.path[0],
               message: e.message,
            })),
         });
      } else {
         respose.status(500).json({
            message: 'INTERNAL SERVER ERROR',
         });
      }
   }
}
