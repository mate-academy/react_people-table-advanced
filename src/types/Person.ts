export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother: Person | undefined;
  father: Person | undefined;
}

export type FiltersSex = 'All' | 'Male' | 'Female';

export type SortField = 'name' | 'sex' | 'born' | 'died';

export type FilterCenturies = '16' | '17' | '18' | '19' | '20';
