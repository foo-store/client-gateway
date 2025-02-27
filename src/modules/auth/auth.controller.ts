import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/common/constants';
import { CreateUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.clientProxy
      .send<string, CreateUserDto>('auth.user.register', createUserDto)
      .pipe(
        catchError((error) => {
          throw error;
        }),
      );
  }
}
