import { Role } from '@prisma/client';
import { DTO } from './common.dto';

export interface RegisterRequestDto extends DTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: Role;
}

export interface UpdateUserRequestDto extends RegisterRequestDto {
    uuid: string;
}

