import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  address!: string;

  @IsOptional()
  @IsUUID()
  ownerId?: string;
}
