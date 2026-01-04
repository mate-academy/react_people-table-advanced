import type { Person } from './Person';

export type PeopleListType = {
  peoplelist?: Person[];
  loader: boolean;
  errortext: string;
  onError?: (value: string) => void;
  onPeople: (value: Person[]) => void;
  originalPeoplelist?: Person[];
};
