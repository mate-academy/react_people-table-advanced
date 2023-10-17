import { Person } from '../types';
import { Filters } from '../types/Filters';

export type Context = {
  people: Person[];
  loading: boolean;
  loadingError: boolean;
  filterPeople: (filters: Filters) => Person[];
};
