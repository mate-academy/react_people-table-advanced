import { Person } from './Person';

export interface FilterParams {
  sex: string | null,
  query: string | null,
  centuries: string[],
  people: Person[],
}
