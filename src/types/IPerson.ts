export interface IPerson {
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: IPerson;
  father?: IPerson;
}
