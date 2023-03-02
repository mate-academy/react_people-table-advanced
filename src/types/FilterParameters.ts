import { Person } from './Person';

export interface FilterParameters {
  sex: string;
  query: string;
  centuries: string[];
  people: Person[];
  sort: string,
  order: string,
}
