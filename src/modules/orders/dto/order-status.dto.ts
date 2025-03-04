import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../enums';

export class OrderStatusDto {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
