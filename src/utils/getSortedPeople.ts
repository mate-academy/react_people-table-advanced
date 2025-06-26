import { Person } from '../types/Person';
import { SortDirection } from '../types/SortDirection';
import { SortFields } from '../types/SortFields';

export const getSortedPeople = (
  filteredPeople: Person[],
  columnName: SortFields | null,
  direction: SortDirection,
): void => {
  if (!columnName || !direction) {
    return;
  }

  filteredPeople.sort((person1, person2) => {
    const valueA = person1[columnName];
    const valueB = person2[columnName];

    switch (true) {
      case valueA < valueB:
        return direction === 'asc' ? -1 : 1;
      case valueA > valueB:
        return direction === 'asc' ? 1 : -1;
      default:
        return 0;
    }
  });
};
