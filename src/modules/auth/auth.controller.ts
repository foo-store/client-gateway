import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/common/constants';
import { CreateUserDto, LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.clientProxy
      .send<any, CreateUserDto>('auth.user.register', createUserDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.clientProxy
      .send<any, LoginUserDto>('auth.user.login', loginUserDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
