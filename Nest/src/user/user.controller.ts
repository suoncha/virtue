import { Controller, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import mongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { User } from './user.schema';

@Controller('user')
@UseInterceptors(mongooseClassSerializerInterceptor(User))
export class UserController {
  constructor(private readonly userService: UserService) {}
}
