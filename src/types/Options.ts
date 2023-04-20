import { Person } from './Person';

export type Options = {
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  order: string | null,
  sort: string | null,
};
