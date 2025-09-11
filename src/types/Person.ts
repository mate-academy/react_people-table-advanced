export interface Person {
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  motherName?: string | null;
  fatherName?: string | null;
  slug: string;
}
