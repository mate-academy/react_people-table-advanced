export interface Person {
  map(arg0: (person: unknown) => JSX.Element): import('react').ReactNode;
  find(arg0: (person: unknown) => boolean): unknown;
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string | null,
  motherName: string | null,
  slug: string,
  mother?: Person,
  father?: Person,
}
