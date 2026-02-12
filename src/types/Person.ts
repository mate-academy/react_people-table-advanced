export interface Person {
  readonly slug: string;
  name: string;
  sex: string;
  born: number;
  died?: number | null;
  fatherName: string | null;
  motherName: string | null;
}
