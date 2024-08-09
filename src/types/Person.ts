export interface Person {
  id: string;
  name: string;
  sex: string;
  born: number;
  died: number | null;
  mother?: Person;
  father?: Person;
  motherName?: string;
  fatherName?: string;
  slug?: string;
}
