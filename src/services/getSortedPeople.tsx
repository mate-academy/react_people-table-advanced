import { Person } from '../types';
import { SortColumn } from '../types/SortColumn';

type SortParams = {
  sortColumn: string;
  sortOrder: string;
};

export const getSortedPeople = (
  people: Person[],
  { sortColumn, sortOrder }: SortParams,
) => {
  const sortedPeople = [...people];

  if (sortColumn) {
    sortedPeople.sort((person1: Person, person2: Person) => {
      const item1 = person1[sortColumn as SortColumn];
      const item2 = person2[sortColumn as SortColumn];

      if (typeof item1 === 'number' && typeof item2 === 'number') {
        return item1 - item2;
      }

      if (typeof item1 === 'string' && typeof item2 === 'string') {
        return item1.localeCompare(item2);
      }

      return 0;
    });

    if (sortOrder) {
      sortedPeople.reverse();
    }
  }

  return sortedPeople;
};
