import { Person } from '../types';

import {
  filterBySex,
  filterByQuery,
  filterByCenturies,
  sortPeople,
} from './utils';

interface FilterParams {
  sex: string | null;
  query: string | null;
  centuries: string[];
  sortField: keyof Person | null;
  order: boolean;
}

export function getFilteredPeople(
  people: Person[],
  { sex, query, centuries, sortField, order }: FilterParams,
): Person[] {
  let preparedList = filterBySex(people, sex);
  preparedList = filterByQuery(preparedList, query);
  preparedList = filterByCenturies(preparedList, centuries);
  preparedList = sortPeople(preparedList, sortField, order);

  return preparedList;
}
