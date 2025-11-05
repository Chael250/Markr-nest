import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';

@Module({
  providers: [],
  controllers: [AuthController]
})
export class AuthModule {}
