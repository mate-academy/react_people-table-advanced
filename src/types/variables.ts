export type FilterOptions = {
  sex: string | null;
  searchTerm: string | null;
  selectedCenturies: string[];
  sortBy: string | null;
  sortOrder: string | null;
};

export enum GenderStatus {
  All = '',
  Male = 'm',
  Female = 'f',
}
