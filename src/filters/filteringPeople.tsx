import { Person } from '../types';
import { filtrerByCenturies } from './filterByCenturies';
import { filterByQuery } from './filterByQuery';
import { filterBySex } from './filterBySex';
import { sortPeople } from './sortPeople';

interface Filter {
  sex: string | null;
  query: string | null;
  centuries: string[] | null;
  sort: string | null;
  order: string | null;
}

export const getFilteredPeople = (people: Person[], params: Filter) => {
  const { sex, query, centuries, sort, order } = params;

  let peopleToFilter = [...people];

  peopleToFilter = filterBySex(peopleToFilter, sex);
  peopleToFilter = filtrerByCenturies(peopleToFilter, centuries);
  peopleToFilter = filterByQuery(peopleToFilter, query);
  peopleToFilter = sortPeople(peopleToFilter, sort, order);

  return peopleToFilter;
};
