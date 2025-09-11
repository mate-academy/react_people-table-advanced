export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person | undefined;
  father?: Person | undefined;
  century?: number;
}

export interface PersonWithCentury extends Person {
  century: number;
}
