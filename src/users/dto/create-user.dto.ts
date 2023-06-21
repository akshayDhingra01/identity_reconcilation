import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email?: string;

  @IsOptional()
  phoneNumber?: Number;
}