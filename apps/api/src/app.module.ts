import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GatewayModule } from './gateway/gateway.module';
import { PushModule } from './push/push.module';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [PrismaModule, GatewayModule, PushModule, RequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
