import { Sex } from '../Sex';

export type FilterService = {
  query: string;
  sexFilter: Sex | null;
  centuryFilter: number[];
};
