import { Person } from './Person';

export type PersonSlug = Person['slug'];

export type PeopleDictionary = Record<PersonSlug, Person>;

export type PeopleContextType = {
  people: PeopleDictionary;
  peopleSlugs: PersonSlug[];
  fetchPeople: () => void;
  isLoading: boolean;
  hasError: boolean;
};
