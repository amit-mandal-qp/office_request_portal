import { Body, Controller, Delete, Get, HttpCode, Post, Query } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';
import { PushService } from './push.service';

export class SubscribeDto {
  @IsString()
  endpoint: string;

  @IsString()
  p256dh: string;

  @IsString()
  auth: string;

  @IsOptional()
  @IsString()
  deviceName?: string;
}

export class UnsubscribeDto {
  @IsString()
  endpoint: string;
}

@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Post('subscribe')
  @HttpCode(201)
  async subscribe(@Body() dto: SubscribeDto): Promise<void> {
    await this.pushService.subscribe(dto);
  }

  @Delete('subscribe')
  @HttpCode(200)
  async unsubscribe(@Body() dto: UnsubscribeDto): Promise<void> {
    await this.pushService.unsubscribe(dto.endpoint);
  }

  @Get('subscriptions/check')
  async check(@Query('endpoint') endpoint: string): Promise<{ subscribed: boolean }> {
    const subscribed = await this.pushService.isSubscribed(endpoint);
    return { subscribed };
  }
}
