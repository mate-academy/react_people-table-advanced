import { Person } from './Person';

export interface RootState {
  people: Person[];
  searchResultCount: number;
}
