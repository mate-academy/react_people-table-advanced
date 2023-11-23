import { Person } from './Person';

export type Sorting = {
  sort?: keyof Person | null;
  order?: string | null;
};
