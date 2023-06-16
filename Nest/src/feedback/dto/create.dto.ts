import { IsNotEmpty } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  content: string;
}
