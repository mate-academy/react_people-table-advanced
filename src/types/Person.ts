export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
}

export enum PersonField {
  Name = 'Name',
  Sex = 'Sex',
  Born = 'Born',
  Died = 'Died',
  MotherName = 'Mother',
  FatherName = 'Father',
}
