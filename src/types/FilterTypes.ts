export const SexFilter = {
  All: null,
  Male: 'm',
  Female: 'f',
} as const;

export type SexFilterType = (typeof SexFilter)[keyof typeof SexFilter];
