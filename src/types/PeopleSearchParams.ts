import { Person } from './Person';
import { Sex } from './sex';

export type PeopleSearchParams = {
  query: string | null;
  sex: Sex | null;
  centuries: number[] | null;
  sort?: keyof Person | null;
  order?: 'asc' | 'desc' | null;
};
