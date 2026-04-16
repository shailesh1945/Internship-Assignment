import {
  IsEmail,
  IsNotEmpty,
  Matches,
  Length,
  IsOptional,
  IsEnum,
} from 'class-validator';

import { Role } from '../../users/entities/user.entity';

export class RegisterDto {
  @IsNotEmpty()
  @Length(20, 60)
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
  password!: string;

  @IsNotEmpty()
  @Length(1, 400)
  address!: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}