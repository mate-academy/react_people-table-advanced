export interface Person {
  id: number;
  name: string;
  sex: string;
  born: number;
  died: number;
  mother?: Person | null;
  father?: Person | null;
  motherName?: string | null;
  fatherName?: string | null;
  slug: string;
  century?: string;
}
