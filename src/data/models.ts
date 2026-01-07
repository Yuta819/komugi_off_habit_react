export type TargetType = 'wheat' | 'sugar' | 'both';
export type StatusType = 'OFF' | 'ATE' | 'MAYBE';

export interface DailyLog {
  date: string;
  wheatStatus: StatusType;
  sugarStatus: StatusType;
  skinScore: number;
  moodScore: number;
  note?: string;
}

export interface Profile {
  startDate: string;
  targetType: TargetType;
  targetDays: number;
  visionText: string;
  triggers: string[];
  supporterEnabled: boolean;
  pairingCode?: string;
  maybeCountsAsOff: boolean;
}

export interface Cheer {
  createdAt: string;
  stickerId: string;
  message: string;
  fromRole: 'supporter' | 'self';
}

export interface PurchaseState {
  isLifetime: boolean;
  isSubscription: boolean;
  lastCheckedAt: string;
}
