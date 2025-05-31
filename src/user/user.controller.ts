import { Body, Controller, Inject, Param, Post, Query, UseFilters } from '@nestjs/common';
import { Role } from '@prisma/client';
import { BadRequestException } from 'src/common/exceptions/badRequest.exception';
import { ResponseData } from 'src/dto/common.dto';
import { RegisterRequestDto } from 'src/dto/user.dto';
import { UserService } from './user.service';
import { ErrorFilter } from 'src/common/error/error.filter';

@Controller('user')
@UseFilters(ErrorFilter)
export class UserController {


  @Inject()
  private readonly userService: UserService;


   @Post("/register")
   public async register(@Body() request: RegisterRequestDto, @Query('type') type: string): Promise<ResponseData<void>> {
      switch (type) {
         case Role.BUYER:
            request.role = Role.BUYER;
            break;
         case Role.FARMER:
            request.role = Role.FARMER;
            break;
         case Role.GOVERMENT:
            request.role = Role.GOVERMENT;
            break;
         case Role.INVESTOR:
            request.role = Role.INVESTOR;
            break;
         case Role.SELLER:
            request.role = Role.SELLER;
            break;
         case Role.USER:
            request.role = Role.USER;
            break;
         default:
            throw new BadRequestException('type tidak valid, type hanya boleh FARMER | SELLER BUYER | GOVERMENT | INVESTOR | USER');
      }
      await this.userService.create(request)
      return {
         message: 'Berhasil registrasi',
      };
   }

   public async findAll(): Promise<any> {

   }
}
