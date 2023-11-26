import { Filter } from './Filter';
import { Person } from './Person';

export type Context = {
  people: Person[];
  isLoading: boolean;
  loadingError: boolean;
  filterPeople: (filters: Filter) => Person[];
};
