import { Person } from './Person';

export type RootState = {
  people: Person[];
  isLoading: boolean;
  sortAndFilterPeople: Person[];
};
