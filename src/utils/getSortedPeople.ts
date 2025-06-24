import { Person } from '../types/Person';
import { SortConfig } from '../types/SortConfig';

export const getSortedPeople = (
  people: Person[],
  config: SortConfig,
): Person[] => {
  if (!config.columnName || !config.direction) {
    return people;
  }

  return [...people].sort((person1, person2) => {
    const valueA = person1[config.columnName];
    const valueB = person2[config.columnName];

    if (valueA < valueB) {
      return config.direction === 'asc' ? -1 : 1;
    }

    if (valueA > valueB) {
      return config.direction === 'asc' ? 1 : -1;
    }

    return 0;
  });
};
