export const sortableKeys = ['name', 'sex', 'born', 'died'] as const;
export type SortKey = (typeof sortableKeys)[number];

export function isSortKey(key: string): key is SortKey {
  return sortableKeys.includes(key as SortKey);
}
