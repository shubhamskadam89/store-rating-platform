import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @MinLength(20)
  @MaxLength(60)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[^A-Za-z0-9]/, {
    message: 'Password must contain at least one special character',
  })
  password!: string;

  @IsString()
  @MaxLength(400)
  address!: string;

  @IsEnum(Role)
  role!: Role;
}
