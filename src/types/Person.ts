export interface Person {
  map(arg0: (person: any) => import("react").JSX.Element): import("react").ReactNode;
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
