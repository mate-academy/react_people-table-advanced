import { Person } from '../types';
import { SortField, SortOrder } from '../types/SortTypes';
import { filterByCenturies } from './filters/filterByCenturies';
import { filterByQuery } from './filters/filterByQuery';
import { filterBySex } from './filters/filterBySex';
import { sortPeople } from './sortPeople';

export const getFilteredPeople = ({
  people,
  query,
  sex,
  centuries,
  sort,
  order,
}: {
  people: Person[];
  query: string;
  sex: string;
  centuries: string[];
  sort: SortField;
  order: SortOrder;
}): Person[] => {
  const filteredByQuery = filterByQuery(people, query);
  const filteredBySex = filterBySex(filteredByQuery, sex);
  const filteredByCenturies = filterByCenturies(filteredBySex, centuries);

  if (sort) {
    return sortPeople(filteredByCenturies, sort, order);
  }

  return filteredByCenturies;
};
