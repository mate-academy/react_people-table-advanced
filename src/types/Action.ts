import { Person } from './Person';

export type Action =
  | { type: 'setPeople'; payload: Person[] }
  | { type: 'setSearchResultCount'; payload: number };
