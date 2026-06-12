export const Urgency = {
  NORMAL: 'NORMAL',
  URGENT: 'URGENT',
} as const;
export type Urgency = (typeof Urgency)[keyof typeof Urgency];

export const Status = {
  PENDING: 'PENDING',
  ACKNOWLEDGED: 'ACKNOWLEDGED',
  DONE: 'DONE',
} as const;
export type Status = (typeof Status)[keyof typeof Status];

export interface Category {
  id: string
  en: string
  bn: string
  icon: string
  color: string
  bg: string
}

export interface RequestDto {
  id: string
  requesterName: string
  category: string
  categoryEn: string
  categoryBn: string
  customText?: string
  urgency: Urgency
}

export interface RequestRecord extends RequestDto {
  status: Status
  createdAt: string
  updatedAt: string
}

export interface RequestNewPayload {
  request: RequestRecord
}

export interface RequestUpdatedPayload {
  id: string
  status: Status
}
