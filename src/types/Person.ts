import { Nullable } from './Nullable';

export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: Nullable<string>;
  motherName: Nullable<string>;
  slug: string;
  mother?: Person;
  father?: Person;
}
