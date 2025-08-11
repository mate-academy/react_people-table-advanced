import { Person, Filter } from '../types';
import { filterByCenturies, filterByQuery, filterBySex } from './filters';
import { sortPeople } from './sortPeople';

export const getFilteredPeople = (people: Person[], params: Filter) => {
  const { sex, query, centuries, sort, order } = params;

  let filteredPeople = [...people];

  filteredPeople = filterBySex(filteredPeople, sex);
  filteredPeople = filterByQuery(filteredPeople, query);
  filteredPeople = filterByCenturies(filteredPeople, centuries);
  filteredPeople = sortPeople(filteredPeople, sort, order);

  return filteredPeople;
};
