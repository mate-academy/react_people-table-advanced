import { PersonSex } from './PersonSex';

export interface Person {
  name: string;
  sex: PersonSex;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
}
