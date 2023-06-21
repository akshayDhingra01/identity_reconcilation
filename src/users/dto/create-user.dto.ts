import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email?: string;

  @IsNumber()
  id: Number

  @IsOptional()
//   @IsNumberString()
//   @IsNotEmpty()
//   @Length(10, 10, {
//       message: 'Invalid Mobile Number',
//   })
//   mobile: string;
  phoneNumber?: Number

  @IsString()
  linkPrecedence : "secondary"|"primary" // "primary" if it's the first Contact in the link

  @IsNumber()
  linkedId?: Number // the ID of another Contact linked to this one?

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

}