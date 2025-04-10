export const SexOptions = {
  ALL: 'All',
  MALE: 'Male',
  FEMALE: 'Female',
} as const;

export type SexOption = (typeof SexOptions)[keyof typeof SexOptions];

export const SexParamMap: Record<SexOption, string | null> = {
  [SexOptions.ALL]: null,
  [SexOptions.MALE]: 'm',
  [SexOptions.FEMALE]: 'f',
};
