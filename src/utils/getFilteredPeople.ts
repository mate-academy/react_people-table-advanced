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
  let visiblePeople = [...people];

  visiblePeople = filterByQuery(visiblePeople, query);
  visiblePeople = filterBySex(visiblePeople, sex);
  visiblePeople = filterByCenturies(visiblePeople, centuries);

  if (sort) {
    visiblePeople = sortPeople(visiblePeople, sort, order);
  }

  return visiblePeople;
};
