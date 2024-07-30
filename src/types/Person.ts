type PersonAdditionalInfo = string | number | null;

export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  [key: string]: PersonAdditionalInfo; // Use the defined type here
}
