import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppGateway } from '../gateway/app.gateway';
import { PushService } from '../push/push.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { Status, RequestRecord } from '@office/shared';

@Injectable()
export class RequestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: AppGateway,
    private readonly push: PushService,
  ) {}

  async create(dto: CreateRequestDto): Promise<RequestRecord> {
    const record = await this.prisma.request.upsert({
      where: { id: dto.id },
      create: {
        id: dto.id,
        requesterName: dto.requesterName,
        category: dto.category,
        categoryEn: dto.categoryEn,
        categoryBn: dto.categoryBn,
        customText: dto.customText,
        urgency: dto.urgency,
        status: Status.PENDING,
      },
      update: {},
    });

    const result = this.toRecord(record);
    this.gateway.emitRequestNew(result);

    await this.push.sendToAll(
      `New Request — ${dto.categoryEn}`,
      `${dto.requesterName} needs ${dto.categoryEn}`,
      dto.urgency.toLowerCase() as 'normal' | 'urgent',
      dto.id,
    );

    return result;
  }

  async getActive(): Promise<RequestRecord[]> {
    const records = await this.prisma.request.findMany({
      where: { status: { not: Status.DONE } },
      orderBy: { createdAt: 'desc' },
    });
    return records.map(this.toRecord);
  }

  async updateStatus(id: string, status: Status): Promise<RequestRecord> {
    const record = await this.prisma.request.update({
      where: { id },
      data: { status },
    });

    const result = this.toRecord(record);
    this.gateway.emitRequestUpdated(id, status);
    return result;
  }

  private toRecord(r: any): RequestRecord {
    return {
      id: r.id,
      requesterName: r.requesterName,
      category: r.category,
      categoryEn: r.categoryEn,
      categoryBn: r.categoryBn,
      customText: r.customText ?? undefined,
      urgency: r.urgency,
      status: r.status,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    };
  }
}
