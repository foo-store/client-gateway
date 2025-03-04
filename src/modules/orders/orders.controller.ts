import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/common/constants';
import { GetUser } from '../auth/decorators';
import { AuthGuard } from '../auth/guards';
import { User } from '../auth/interfaces';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatusDto } from './dto/order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@GetUser() user: User, @Body() createOrderDto: CreateOrderDto) {
    return this.clientProxy
      .send<string, { userId: string } & CreateOrderDto>('order.create', {
        userId: user.id,
        ...createOrderDto,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error.message);
        }),
      );
  }

  @Get()
  @UseGuards(AuthGuard)
  listFiltered(@Query() orderStatusDto: OrderStatusDto) {
    return this.clientProxy
      .send<string, OrderStatusDto>('order.list-filtered', orderStatusDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error.message);
        }),
      );
  }
}
