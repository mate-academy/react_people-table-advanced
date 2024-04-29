import { Person } from './Person';

export interface State {
  people: Person[];
  filteredPeople: null | Person[];
  filteredError: string;
  error: string;
  loading: boolean;
}
