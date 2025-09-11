import { Person } from './Person';

export type SortField = 'name' | 'sex' | 'born' | 'died';
export type SortOrder = 'asc' | 'desc';

export type Filters = {
  sex?: Person['sex'];
  query?: string;
  centuries?: string[];
  sort?: SortField;
  order?: SortOrder;
};
