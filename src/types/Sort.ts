export const SORT_OPTIONS = ['name', 'sex', 'born', 'died'] as const;
export const ORDER_OPTIONS = ['desc'] as const;

export type Sort = (typeof SORT_OPTIONS)[number];
export type Order = (typeof ORDER_OPTIONS)[number];

export type SortParams = {
  sort: Sort | null;
  order: Order | null;
};
