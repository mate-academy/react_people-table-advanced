export interface Filters {
  sex?: string | null;
  query?: string | null;
  centuries?: string[];
  sort?: 'name' | 'sex' | 'born' | 'died';
  order?: 'asc' | 'desc';
}
