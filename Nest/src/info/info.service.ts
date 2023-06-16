import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InfoDto, InitDto } from './dto/info.dto';
import { Info } from './info.schema';

@Injectable()
export class InfoService {
  constructor(@InjectModel(Info.name) private infoModel: Model<Info>) {}

  async getInfoByUser(username: string) {
    const info = await this.infoModel.find({ username: username });

    if (!info) {
      throw new NotFoundException('Info not found!');
    }

    return info;
  }

  async createInfo(dto: InitDto, username: string) {
    const info = await this.infoModel.findOne({
      username: username,
      saveNo: dto.saveNo,
    });
    if (info) throw new ForbiddenException('Info exits');

    await this.infoModel.create({
      ...dto,
      hpRate: 0.0,
      win: 0,
      death: 0,
      plays: 0,
    });
  }

  async updateInfo(dto: InfoDto, username: string) {
    await this.infoModel
      .findOneAndUpdate({ username: username, saveNo: dto.saveNo }, dto)
      .setOptions({ overwrite: true, new: true })
      .catch(() => {
        throw new NotFoundException('Info not found');
      });
  }

  async deleteInfo(dto: InitDto, username: string) {
    await this.infoModel
      .deleteOne({
        username: username,
        saveNo: dto.saveNo,
      })
      .catch(() => {
        throw new NotFoundException('Info not found');
      });
  }
}
