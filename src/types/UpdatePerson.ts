import { Person } from './Person';

export interface UpdatePerson {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
  mother?: Person | null,
  father?: Person | null,
}
