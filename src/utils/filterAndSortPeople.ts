import { Person } from '../types';
import { SortBy } from '../types/SortBy';

export const filterAndSortPeople = (
  people: Person[],
  query: string | null,
  sexFilter: string | null,
  centuries: string[],
  sort: SortBy | string,
  sortOrder: string,
) => {
  let visiblePeople = people;

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      return person.name.toLowerCase().includes(query.toLowerCase())
      || person.motherName?.toLowerCase().includes(query.toLowerCase())
      || person.fatherName?.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (sexFilter) {
    visiblePeople = visiblePeople.filter(person => person.sex === sexFilter);
  }

  if (centuries.length) {
    visiblePeople = visiblePeople
      .filter(person => centuries
        .includes((Math.ceil(person.born / 100).toString())));
  }

  switch (sort) {
    case SortBy.Name:
    case SortBy.Sex:
      visiblePeople = visiblePeople
        .sort((a, b) => (!sortOrder
          ? a[sort].localeCompare(b[sort])
          : b[sort].localeCompare(a[sort])));
      break;

    case SortBy.Born:
    case SortBy.Died:
      visiblePeople = visiblePeople
        .sort((a, b) => (!sortOrder
          ? a[sort] - b[sort]
          : b[sort] - a[sort]));
      break;
    default:
      return visiblePeople;
  }

  return visiblePeople;
};
