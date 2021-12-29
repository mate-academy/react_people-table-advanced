export interface Human {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
  father?: Human;
  mother?: Human;
}
