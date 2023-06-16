import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';

import { CreateFeedbackDto } from './dto/create.dto';

import { FeedbackDocument } from './feedback.schema';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel('Feedback') private feedbackModel: Model<FeedbackDocument>,
  ) {}

  async sendNof(name: string, content: string) {
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
      to: 'vu.pham232001@gmail.com',
      subject: 'Feedback received',
      text: 'From: ' + name + '\nContent: ' + content,
    });
  }

  async createFeedback(dto: CreateFeedbackDto) {
    const time = new Date();

    this.sendNof(dto.name, dto.content);

    await this.feedbackModel.create({
      ...dto,
      time: time,
    });
  }
}
