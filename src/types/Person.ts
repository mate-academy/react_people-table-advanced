import { GenderKey } from './FilterBy';

export interface Person {
  name: string;
  sex: GenderKey;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
}
