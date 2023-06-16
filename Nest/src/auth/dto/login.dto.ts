import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Username too short',
  })
  @MaxLength(12, {
    message: 'Username too long',
  })
  username: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password too short',
  })
  password: string;
}
