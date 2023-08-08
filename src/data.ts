import { SexFilter } from './types/SexFilter';
import { SortColumns } from './utils/SortColumns';

export const centuryFilters = ['16', '17', '18', '19', '20'];

export const sexFilters = [
  { title: 'All', value: SexFilter.ALL },
  { title: 'Male', value: SexFilter.MALE },
  { title: 'Female', value: SexFilter.FEMALE },
];

export const sortingLinks = [
  { title: 'Name', value: SortColumns.NAME },
  { title: 'Sex', value: SortColumns.SEX },
  { title: 'Born', value: SortColumns.BORN },
  { title: 'Died', value: SortColumns.DIED },
];
