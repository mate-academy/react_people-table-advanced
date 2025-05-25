export type Person = {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
};

export type SortOrder = 'asc' | 'desc';
export type SortField = keyof Person;
