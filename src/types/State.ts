import { IPerson } from './IPerson';

export type SortType = 'sex' | 'died' | 'born' | 'name';

export interface State {
  people: IPerson[];
  sortedAndFilteredPeople: IPerson[];
  isLoading: boolean;
  isError: boolean;
}
