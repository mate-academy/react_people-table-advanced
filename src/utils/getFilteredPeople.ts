import { Person } from '../types';
import { SortBy } from '../types/Constants';

export const getFilteredPeople = (
  persons: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sortBy: string | null,
  sortOrder: string | null,
) => {
  let visiblePeople = [...persons];

  if (sex) {
    visiblePeople = persons.filter(person => person.sex === sex);
  }

  if (query !== null) {
    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sortBy) {
    visiblePeople.sort((pers1, pers2) => {
      switch (sortBy) {
        case SortBy.name:
        case SortBy.sex:
          return pers1[sortBy].localeCompare(pers2[sortBy]);

        case SortBy.born:
        case SortBy.died:
          return pers1[sortBy] - pers2[sortBy];

        default:
          return 0;
      }
    });
  }

  if (sortOrder) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
