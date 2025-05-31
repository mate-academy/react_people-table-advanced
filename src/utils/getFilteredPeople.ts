import { Person } from '../types';
import { SortBy } from '../types/Filters';

export const getFilteredPeople = (
  peopleToUpdate: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sort: string,
  order: string,
) => {
  let visiblePeople = [...peopleToUpdate];

  if (query) {
    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
      switch (sort) {
        case SortBy.Name:
        case SortBy.Sex:
          return a[sort].localeCompare(b[sort]);
        case SortBy.Born:
        case SortBy.Died:
          return a[sort] - b[sort];
        default:
          return 0;
      }
    });
  }

  if (order) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
