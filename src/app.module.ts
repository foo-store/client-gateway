import { Module } from '@nestjs/common';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ProductsModule, OrdersModule, AuthModule],
})
export class AppModule {}
