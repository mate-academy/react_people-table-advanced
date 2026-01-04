import { Person } from './Person';

export type PeopleFiltersType = {
  peopleList: Person[];
  onPeople: (value: Person[]) => void;
  onError: (value: string) => void;
};
