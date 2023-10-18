import { Person, SortBy, SortOrder } from '../types';
import { getSortBy } from './SortBy';

export const getPeopleFiltered = (
  people: Person[],
  filterBySex: string | null,
  search: string | null,
  centuries: string[],
  sortBy: SortBy,
  sortOrder: SortOrder,
) => {
  let filtered = people;
  let filterSex;
  let filterQuery;
  let filterCenturies;

  if (filterBySex) {
    filterSex = filtered.filter(person => person.sex === filterBySex);
    filtered = filterSex;
  }

  if (search) {
    filterQuery = filtered
      .filter(person => person.name.toLowerCase()
        .includes(search.toLowerCase() || ''));
    filtered = filterQuery;
  }

  if (centuries.length > 0) {
    filterCenturies = filtered.filter(person => {
      return centuries
        .find(century => century
          .includes(String(Math.ceil(person.born / 100))));
    });
    filtered = filterCenturies;
  }

  return getSortBy(filtered, sortBy, sortOrder);
};
