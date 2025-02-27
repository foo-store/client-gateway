import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/common/constants';
import { PaginationDto } from 'src/common/dto';
import { CreateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Get()
  getProducts(@Query() paginationDto: PaginationDto) {
    return this.clientProxy.send('product.list', paginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.clientProxy.send('product.create', createProductDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
