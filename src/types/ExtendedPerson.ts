import { Person } from './Person';

export interface ExtendedPerson {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName?: string,
  motherName?: string,
  slug: string,
  mother?: Person,
  father?: Person,
}
