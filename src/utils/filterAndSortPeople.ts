import { Person } from '../types';
import { SortBy } from '../types/SortBy';

export const filterAndSortPeople = (
  people: Person[],
  query: string | null,
  filterSex: string | null,
  centuries: string[],
  sortType: SortBy | string,
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

  if (filterSex) {
    visiblePeople = visiblePeople.filter(person => person.sex === filterSex);
  }

  if (centuries.length) {
    visiblePeople = visiblePeople
      .filter(person => centuries
        .includes((Math.ceil(person.born / 100).toString())));
  }

  switch (sortType) {
    case SortBy.name:
    case SortBy.sex:
      visiblePeople = visiblePeople
        .sort((a, b) => (!sortOrder
          ? a[sortType].localeCompare(b[sortType])
          : b[sortType].localeCompare(a[sortType])));
      break;

    case SortBy.born:
    case SortBy.died:
      visiblePeople = visiblePeople
        .sort((a, b) => (!sortOrder
          ? a[sortType] - b[sortType]
          : b[sortType] - a[sortType]));
      break;
    default:
      return visiblePeople;
  }

  return visiblePeople;
};
