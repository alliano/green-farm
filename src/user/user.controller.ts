import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Query, UseFilters } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { BadRequestException } from 'src/common/exceptions/badRequest.exception';
import { FindAllDto, OrderBy, ResponseData } from 'src/dto/common.dto';
import { RegisterRequestDto, UpdateUserRequestDto } from 'src/dto/user.dto';
import { UserService } from './user.service';
import { ErrorFilter } from 'src/common/error/error.filter';
import { PaginationResponse } from 'src/dto/pagination-response.dto';
import { HttpResponseDTO } from 'src/dto/http-response.dto';

@Controller('/user')
@UseFilters(ErrorFilter)
export class UserController {
   
   
   @Inject()
   private readonly userService: UserService;
   
   
   @Post("/register")
   @HttpCode(HttpStatus.CREATED)
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

   @Get("/")
   public async findAll(@Query() request: FindAllDto): Promise<PaginationResponse<User>> {
      request.order_by = request.order_by ?? OrderBy.desc
      const {payload, properties} = await this.userService.findAll(request);
      return new PaginationResponse(payload, properties);
   }

   @Get("/:uuid")
   public async findById(@Param("uuid") uuid: string): Promise<HttpResponseDTO<User>> {
      return new HttpResponseDTO<User>(await this.userService.findByUuid(uuid))
   }

   @Put("/:uuid")
   public async update(@Body() request: UpdateUserRequestDto, @Param("uuid") uuid: string): Promise<any> {
      request.uuid = uuid;
      await this.userService.update(request);
      return {
         message: "Berhasil edit"
      }
   }
}
