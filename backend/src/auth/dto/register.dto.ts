import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(20)
  @MaxLength(60)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password!: string;

  @IsString()
  @MaxLength(400)
  address!: string;
}
