import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { Info, InfoSchema } from './info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Info.name, schema: InfoSchema }]),
  ],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
