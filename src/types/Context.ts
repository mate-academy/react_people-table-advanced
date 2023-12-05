import { Person } from './Person';

export type Context = {
  people: Person[],
  setPeople: (people: Person[]) => void,
  filteredPeople: Person[],
  setFilteredPeople: (people: Person[]) => void,
  sortedPeople: Person[],
  setSortedPeople: (people: Person[]) => void,
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: string) => void;
};
