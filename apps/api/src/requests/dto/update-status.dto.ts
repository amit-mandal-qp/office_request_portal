import { IsEnum } from 'class-validator';
import { Status } from '@office/shared';

export class UpdateStatusDto {
  @IsEnum(Status)
  status: Status;
}
