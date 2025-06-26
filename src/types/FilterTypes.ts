export const SexFilter = {
  All: null,
  Male: 'm',
  Female: 'f',
} as const;

export type SexFilterTypeValues = (typeof SexFilter)[keyof typeof SexFilter];
