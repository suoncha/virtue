import { IsNotEmpty, IsEmail } from 'class-validator';

export class ValidateOTPDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  otp: string;
}

export class SendOTPDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
