import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as otpGenerator from 'otp-generator';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

import { CreateUserDto } from './dto/create.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change.dto';
import { ValidateOTPDto, SendOTPDto } from './dto/otp.dto';

import { UserDocument } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async generateOTP() {
    return otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
  }

  async sendOTP(email: string, otp: string) {
    const client = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await client.sendMail({
      from: {
        name: 'Virtue - Roguelite',
        address: process.env.MAIL_USER,
      },
      to: email,
      subject: 'Account verification',
      text: 'Your OTP is ' + otp,
    });
  }

  async resendOTP(dto: SendOTPDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new NotFoundException('User not exist');

    const otp = await this.generateOTP();
    this.sendOTP(dto.email, otp);

    await this.userModel.findOneAndUpdate({ email: dto.email }, { otp: otp });
  }

  async validateOTP(dto: ValidateOTPDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new NotFoundException('User not exist');

    if (user.otp === dto.otp) {
      if (user.isValidated) {
        const payload = { username: user.username };
        return {
          accessToken: await this.jwtService.signAsync(payload),
        };
      }
      await this.userModel.findOneAndUpdate(
        { email: dto.email },
        { isValidated: true },
      );
    } else throw new ConflictException('Wrong OTP');
  }

  async createUser(dto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const user = await this.userModel
      .findOne({
        $or: [{ username: dto.username }, { email: dto.email }],
      })
      .select({ _id: 0, username: 1, email: 1 })
      .lean();

    if (user) {
      if (user.username === dto.username)
        throw new ConflictException('Duplicate username');
      if (user.email === dto.email)
        throw new ConflictException('Duplicate email');
    }

    const otp = await this.generateOTP();
    this.sendOTP(dto.email, otp);

    await this.userModel.create({
      ...dto,
      password: hashedPassword,
      isValidated: false,
      otp: otp,
    });
  }

  async changePassword(dto: ChangePasswordDto, username: string) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new NotFoundException('User not exist');

    if (user.username !== username) throw new ForbiddenException('DEV');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    await this.userModel.findOneAndUpdate(
      { email: dto.email },
      { password: hashedPassword },
    );
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userModel.findOne({ username: dto.username });
    const payload = { username: user.username };

    if (
      user &&
      user.isValidated &&
      (await bcrypt.compare(dto.password, user.password))
    ) {
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    } else throw new UnauthorizedException();
  }
}
