import { Module } from '@nestjs/common';
import { natsProvider } from 'src/common/providers';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [natsProvider],
})
export class AuthModule {}
