import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GatewayModule } from '../gateway/gateway.module';
import { PushModule } from '../push/push.module';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

@Module({
  imports: [PrismaModule, GatewayModule, PushModule],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
