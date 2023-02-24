import { Person } from '../types/Person';
import { SortBy } from '../types/SortBy';

type SortArgs = {
  filteredPeople: Person[],
  sortBy: keyof SortBy | null,
  order: string | null,
};

type SortPeopleType = (args: SortArgs) => Person[];

export const sortPeople: SortPeopleType = (args) => {
  const { filteredPeople, sortBy, order } = args;

  if (sortBy) {
    filteredPeople.sort((a: Person, b: Person) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return a[sortBy].localeCompare(b[sortBy]);

        case 'born':
        case 'died':
          return a[sortBy] - b[sortBy];

        default:
          return 1;
      }
    });
  }

  if (order) {
    return filteredPeople.reverse();
  }

  return filteredPeople;
};
