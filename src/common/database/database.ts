import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import 'dotenv/config';

@Injectable()
export class Database extends PrismaClient<Prisma.PrismaClientOptions, "query" | "warn" |"info" | "error"> implements OnModuleInit, OnModuleDestroy {
   
    constructor() {
        super({
         datasources: {
            db: {
               url: process.env.DATABASE_URL,
            },
         },
         log: [
            {
               emit: 'event',
               level: 'error',
            },
            {
               emit: 'event',
               level: 'warn',
            },
            {
               emit: 'event',
               level: 'info',
            },
            {
               emit: 'event',
               level: 'query',
            },
         ],
      })
      this.$extends({
         query: {
            $allModels: {
               async findMany({ args, model, operation, query }) {
                  args.where = { ...args.where, deleted_at: null };
                  return query(args);
               },
               async create({ args, model, operation, query }) {
                  args.data = {
                     ...args.data,
                     crated_at: Math.floor(Date.now() / 1000),
                  };
                  return query(args);
               },
               async findUnique({ args, model, operation, query }) {
                  args.where = { ...args.where, deleted_at: null };
                  return query(args);
               },
               async delete({ args, model, operation, query }) {
                  return this[model].update({
                     where: args.where,
                     data: {
                        deleted_at: Math.floor(Date.now() / 1000),
                     },
                  });
               },
               async deleteMany({ args, model, operation, query }) {
                  return this[model].updateMany({
                     where: args.where,
                     data: {
                        deleted_at: Math.floor(Date.now() / 1000),
                     },
                  });
               },
            },
         },
      });
      this.$on('query', (event) => console.log(event));
      this.$on('info', (event) => console.log(event));
      this.$on('warn', (event) => console.log(event));
      this.$on('error', (event) => console.log(event));
   }

   onModuleDestroy() {
      this.$disconnect();
      console.info('💥 Prisma disconnected');
   }

   onModuleInit() {
      this.$connect()
      console.info('📦 Prisma initialized');
   }
}