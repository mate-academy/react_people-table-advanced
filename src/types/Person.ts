export interface Person {
  name: string;
  sex: Sex;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
}

export enum Sex {
  Male = 'm',
  Female = 'f',
}

export type Filters = {
  sex: Sex | null;
  query: string | null;
  centuries: number[];
};

type ExcludeFields = 'id' | 'motherName' | 'fatherName' | 'slug';

export type TableField = {
  name: Exclude<keyof Person, ExcludeFields>;
  sortable: boolean;
};

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
  None = 'none',
}
