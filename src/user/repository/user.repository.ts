import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Database } from 'src/common/database/database';
import { CrudRepository } from 'src/common/interfaces/crud.interface';
import { DTO, FindAllDto, PaginationResult } from 'src/dto/common.dto';
import { RegisterRequestDto, UpdateUserRequestDto } from 'src/dto/user.dto';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class UserRepository implements CrudRepository<DTO> {
    
   @Inject()
   private readonly database: Database;

   async create(request: RegisterRequestDto): Promise<void> {
      await this.database.user.create({
         data: { ...request, uuid: uuidv7() },
      });
   }
   async update(request: UpdateUserRequestDto): Promise<void> {
      this.database.user.update({
         where: {
            uuid: request.uuid,
         },
         data: { ...request },
      });
   }
   async delete(uuid: string): Promise<any> {
      await this.database.user.delete({
         where: {
            uuid: uuid,
         },
      });
   }
   async findAll(request: FindAllDto): Promise<PaginationResult<User>> {
      const limit = parseInt(request.limit!) || 10;
      const page = parseInt(request.offset!) || 1;
      const skip = (page - 1) * limit;

      const [count, result] = await Promise.all([
         this.database.user.count(),
         this.database.user.findMany({
            skip: skip,
            take: page,
            orderBy: {
               uuid: request.order_by.toString() == 'desc' ? 'desc' : 'asc',
            },
         }),
      ]);
      return {
         payload: result,
         properties: {
            page: page,
            page_size: limit,
            total_item: count,
            total_page: Math.floor(count / limit),
         },
      };
   }
   async findByUuid(uuid: string): Promise<User> {
      return await this.database.user.findUnique({
         where: {
            uuid: uuid,
         },
      });
   }

   public async findByEmail(email: string): Promise<User | null> {
      return await this.database.user.findFirst({
         where: {
            email: email
         }
      })
   }
}
