export interface Filter {
  sex: string | null;
  name: string | null;
  centuries: string[];
}

export interface SortOptions {
  column: string | null,
  order: string | null,
}
