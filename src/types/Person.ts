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
  [key: string]: string | number | null | undefined | Person;
}

export interface PeopleTableProps {
  person: Person[];
  errorMessage: string;
  isLoading: boolean;
  serveAlone: boolean;
  selectedUser: string | undefined;
}

export interface PersonProps {
  name?: string | null;
  person?: Person | null;
}
