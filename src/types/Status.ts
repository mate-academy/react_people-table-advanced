export const STATUS = {
  resolved: 'resolved',
  rejected: 'rejected',
  idle: 'idle',
  pending: 'pending',
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
