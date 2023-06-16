import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoDto, InitDto } from './dto/info.dto';

import { JwtAuthGuard } from 'src/auth/jwt.strategy';

@UseGuards(JwtAuthGuard)
@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  async getInfoByUser(@Req() req) {
    return this.infoService.getInfoByUser(req.user);
  }

  @Post()
  async createInfo(@Body() dto: InitDto, @Req() req) {
    return this.infoService.createInfo(dto, req.user);
  }

  @Put()
  async updateInfo(@Body() dto: InfoDto, @Req() req) {
    return this.infoService.updateInfo(dto, req.user);
  }

  @Post('delete')
  async deleteInfo(@Body() dto: InitDto, @Req() req) {
    return this.infoService.deleteInfo(dto, req.user);
  }
}
