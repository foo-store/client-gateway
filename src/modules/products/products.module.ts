import { Module } from '@nestjs/common';
import { natsProvider } from 'src/common/providers';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [natsProvider],
})
export class ProductsModule {}
