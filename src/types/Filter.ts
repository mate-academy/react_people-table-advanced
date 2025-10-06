export type SortKey = 'name' | 'born' | 'died' | 'sex';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  key: SortKey;
  order: SortOrder;
}

export interface Filter {
  sex: string | null;
  query: string | null;
  centuries: string[];
  sort: SortConfig | null;
}
