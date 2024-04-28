import { Person } from './Person';

export interface State {
  people: Person[];
  error: string;
  loading: boolean;
}
