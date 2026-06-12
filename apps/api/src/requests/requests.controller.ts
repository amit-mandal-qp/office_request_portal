import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { RequestRecord } from '@office/shared';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateRequestDto): Promise<RequestRecord> {
    return this.requestsService.create(dto);
  }

  @Get('active')
  async getActive(): Promise<RequestRecord[]> {
    return this.requestsService.getActive();
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
  ): Promise<RequestRecord> {
    return this.requestsService.updateStatus(id, dto.status);
  }
}
