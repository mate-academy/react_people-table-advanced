import { Filters } from './Filter';
import { Person } from './Person';

export type Context = {
  people: Person[];
  isLoading: boolean;
  loadingError: boolean;
  filterPeople: (filters: Filters) => Person[];
};
