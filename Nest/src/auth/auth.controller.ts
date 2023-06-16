import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import mongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.strategy';

import { CreateUserDto } from './dto/create.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change.dto';
import { ValidateOTPDto, SendOTPDto } from './dto/otp.dto';

import { User } from 'src/user/user.schema';

@Controller('auth')
@UseInterceptors(mongooseClassSerializerInterceptor(User))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/create')
  async createUser(@Body() dto: CreateUserDto) {
    return this.authService.createUser(dto);
  }

  @Post('/otp')
  async validateOtp(@Body() dto: ValidateOTPDto) {
    return this.authService.validateOTP(dto);
  }

  @Post('/send')
  async sendMail(@Body() dto: SendOTPDto) {
    return this.authService.resendOTP(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change')
  async changePassword(@Body() dto: ChangePasswordDto, @Req() req) {
    return this.authService.changePassword(dto, req.user);
  }

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return this.authService.validateUser(dto);
  }
}
