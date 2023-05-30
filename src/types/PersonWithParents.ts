import { Person } from './Person';

export interface PersonWithParentsts {
  mother: Person | null | undefined;
  father: Person | null | undefined;
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
}
