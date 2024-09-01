import { Person } from './Person';

export type Action =
  | { type: 'get'; payload: Person[] }
  | { type: 'isLoading'; payload: boolean }
  | { type: 'setSortedAndFiltered'; payload: Person[] };
