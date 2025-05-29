import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import "dotenv/config"

@Injectable()
export class Database extends PrismaClient<Prisma.PrismaClientOptions, "info" | "query" | "error" | "info" | "warn"> implements OnModuleInit, OnModuleDestroy {

    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL
                }
            },
            log: [
                {
                    emit: "event",
                    level: "error"
                },
                {
                    emit: "event",
                    level: "warn"
                },
                {
                    emit: "event",
                    level: "info"
                },
                {
                    emit: "event",
                    level: "query"
                },
            ]
        })
    }
    
    onModuleDestroy() {
        this.$disconnect();
        console.info("Connetion db alredy destory...")
    }
    
    
    onModuleInit() {
        console.info("database conetion initialization...")
        this.$on("query", (event) => console.log(event));
        this.$on("info", (event) => console.log(event));
        this.$on("warn", (event) => console.log(event));
        this.$on("error", (event) => console.log(event));   
    }

}
