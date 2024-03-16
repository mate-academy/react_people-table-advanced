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

export type FilterType = {
  name: string | null;
  sex: string | null;
  centuries: string[];
};
