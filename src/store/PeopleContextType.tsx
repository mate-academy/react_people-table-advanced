import { Person } from '../types';

export interface PeopleContextType {
  people: Person[];
  loading: boolean;
  errorMessage: string;
  query: string;
  sort: string;
  order: string;
  sex: string;
  centuries: string[];
}
