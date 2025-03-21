import {
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
import { PaginationDto } from 'src/common/dto';
import { CreateProductDto } from './dto';
import { AuthGuard } from '../auth/guards';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  getProducts(@Query() paginationDto: PaginationDto) {
    return this.clientProxy
      .send<string, PaginationDto>('product.list', paginationDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.clientProxy
      .send<string, CreateProductDto>('product.create', createProductDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
