import { Person } from './Person';

export type PeopleContextValue = {
  people: Person[];
  isLoading: boolean;
  isError: boolean;
  // errorMessage: string;
  fetchPeople: () => Promise<void>;
};
