import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { natsProvider } from 'src/common/providers';

@Module({
  controllers: [OrdersController],
  providers: [natsProvider],
})
export class OrdersModule {}
