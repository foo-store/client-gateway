import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/common/constants';
import { PaginationDto } from 'src/common/dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) { }

  @Get()
  getProducts(@Query() paginationDto: PaginationDto) {
    return this.clientProxy.send('get-products', paginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
