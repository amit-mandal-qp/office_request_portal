import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Status } from '@office/shared';
import * as webpush from 'web-push';
import type { SubscribeDto } from './push.controller';

@Injectable()
export class PushService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    webpush.setVapidDetails(
      process.env.VAPID_MAILTO!,
      process.env.VAPID_PUBLIC_KEY!,
      process.env.VAPID_PRIVATE_KEY!,
    );
  }

  async subscribe(dto: SubscribeDto): Promise<void> {
    await this.prisma.pushSubscription.upsert({
      where: { endpoint: dto.endpoint },
      create: {
        endpoint: dto.endpoint,
        p256dh: dto.p256dh,
        auth: dto.auth,
        deviceName: dto.deviceName,
      },
      update: {
        p256dh: dto.p256dh,
        auth: dto.auth,
        deviceName: dto.deviceName,
      },
    });

    const pendingCount = await this.prisma.request.count({
      where: { status: { not: Status.DONE } },
    });

    if (pendingCount > 0) {
      const payload = JSON.stringify({
        title: 'Pending Requests',
        body: `You have ${pendingCount} pending request(s) waiting`,
        urgency: 'normal',
        reqId: '',
        vibrate: [200, 50, 200],
        requireInteraction: false,
      });
      try {
        await webpush.sendNotification(
          { endpoint: dto.endpoint, keys: { p256dh: dto.p256dh, auth: dto.auth } },
          payload,
        );
      } catch {
        // catch-up push failure is non-fatal
      }
    }
  }

  async unsubscribe(endpoint: string): Promise<void> {
    await this.prisma.pushSubscription.deleteMany({ where: { endpoint } });
  }

  async isSubscribed(endpoint: string): Promise<boolean> {
    const sub = await this.prisma.pushSubscription.findUnique({
      where: { endpoint },
      select: { id: true },
    });
    return sub !== null;
  }

  async sendToAll(
    title: string,
    body: string,
    urgency: 'normal' | 'urgent',
    reqId: string,
  ): Promise<void> {
    const subscriptions = await this.prisma.pushSubscription.findMany();
    const vibrate = urgency === 'urgent' ? [300, 100, 300, 100, 300] : [200, 50, 200];
    const requireInteraction = urgency === 'urgent';
    const payload = JSON.stringify({ title, body, urgency, reqId, vibrate, requireInteraction });

    await Promise.allSettled(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
            { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
            payload,
            { urgency: urgency as webpush.Urgency },
          );
        } catch (err: any) {
          if (err?.statusCode === 410) {
            await this.prisma.pushSubscription.deleteMany({
              where: { endpoint: sub.endpoint },
            });
          }
        }
      }),
    );
  }
}
