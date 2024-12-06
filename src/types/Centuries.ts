export const CENTURIES = ['16', '17', '18', '19', '20'] as const;

export type Century = (typeof CENTURIES)[number];
