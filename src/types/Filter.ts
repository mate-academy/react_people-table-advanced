import { Person } from './Person';

export interface Filter {
  query: string;
  sex: string;
  centuries: string[];
  sort: keyof Person;
  order: 'desc' | '';
}
