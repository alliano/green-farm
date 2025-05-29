import { Role } from "@prisma/client";
import { z } from "zod";

export class UserValidation {
    static REGISTER = z.object({
        first_name: z.string({required_error: "first_name tidak boleh kosong"}),
        last_name: z.string({required_error: "last_name tidak boleh kosong"}),
        email: z.string({required_error: "email tidak boleh kosong"}).email({message: "email tidak valid"}),
        password: z.string({required_error: "first_name tidak boleh kosong"}),
        role: z.enum([Role.BUYER, Role.FARMER, Role.GOVERMENT, Role.INVESTOR, Role.SELLER])
    })


    static UPDATE = z.object({
        uuid: z.string({required_error: "uuid tidak boleh kosong"}).uuid({message: "uuid tidak valid"}),
        first_name: z.string({required_error: "first_name tidak boleh kosong"}),
        last_name: z.string({required_error: "last_name tidak boleh kosong"}),
        email: z.string({required_error: "email tidak boleh kosong"}).email({message: "email tidak valid"}),
        password: z.string({required_error: "first_name tidak boleh kosong"}),
        role: z.enum([Role.BUYER, Role.FARMER, Role.GOVERMENT, Role.INVESTOR, Role.SELLER])
    })
}