import { Type } from 'class-transformer';
import { IsNotEmpty, Max, Min } from 'class-validator';

export class InfoDto {
  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  @Max(2)
  saveNo: number;

  @IsNotEmpty()
  hpRate: number;

  @IsNotEmpty()
  win: number;

  @IsNotEmpty()
  death: number;

  @IsNotEmpty()
  plays: number;
}

export class InitDto {
  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  @Max(2)
  saveNo: number;
}
