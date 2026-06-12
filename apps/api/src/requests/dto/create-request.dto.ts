import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { Urgency } from '@office/shared';

const ALLOWED_CATEGORIES = [
  'tea_coffee',
  'chanachur',
  'supplies',
  'it_help',
  'meeting',
  'housekeeping',
  'custom',
];

export class CreateRequestDto {
  @IsString()
  id: string;

  @IsString()
  requesterName: string;

  @IsString()
  category: string;

  @IsString()
  categoryEn: string;

  @IsString()
  categoryBn: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  customText?: string;

  @IsEnum(Urgency)
  urgency: Urgency;
}
