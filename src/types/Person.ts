import { Sex } from './Sex';

export interface Person {
  name: string,
  sex: Sex,
  born: number,
  died: number,
  fatherName: string | null,
  motherName: string | null,
  slug: string,
  mother?: Person,
  father?: Person,
}
