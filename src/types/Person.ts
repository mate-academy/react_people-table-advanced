export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
}

export interface SortParams {
  sortBy: 'Born' | 'Died' | 'Name' | 'Sex' | null;
  sortOrder: 'asc' | 'desc' | null;
}

export enum SortColumns {
  Name = 'Name',
  Sex = 'Sex',
  Born = 'Born',
  Died = 'Died',
}
