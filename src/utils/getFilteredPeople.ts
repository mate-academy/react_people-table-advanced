import { Person } from '../types';
import { SortBy } from '../types/enumSortBy';

export const getFilteredPeople = (
  people: Person[],
  sortBy: SortBy | null,
  order: string | null,
  sexQuery: string | null,
  query: string | null,
  centuries: string[],
) => {
  let filteredPeople = [...people];

  if (sexQuery) {
    filteredPeople = filteredPeople.filter(({ sex }) => sex === sexQuery);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    filteredPeople = filteredPeople.filter(
      ({ name, motherName, fatherName }) =>
        name.toLowerCase().includes(normalizedQuery) ||
        motherName?.toLowerCase().includes(normalizedQuery) ||
        fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(({ born }) =>
      centuries.includes(Math.ceil(born / 100).toString()),
    );
  }

  if (sortBy) {
    filteredPeople = filteredPeople.sort((person1, person2) => {
      switch (sortBy) {
        case SortBy.Born:
        case SortBy.Died:
          return person1[sortBy] - person2[sortBy];

        case SortBy.Name:
        case SortBy.Sex:
          return person1[sortBy].localeCompare(person2[sortBy]);

        default:
          return 0;
      }
    });
  }

  if (order) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};
