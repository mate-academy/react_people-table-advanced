import { Person } from '../types';
import { SortOptions } from '../types/SortOptions';

export function getSortedPeople(
  peopleToSort: Person[],
  option: SortOptions,
  sortDirection: number,
) {
  return peopleToSort.sort((a: Person, b: Person) => {
    const person1 = a[option];
    const person2 = b[option];

    if (typeof person1 === 'string' && typeof person2 === 'string') {
      return sortDirection * person1.localeCompare(person2);
    }

    if (typeof person1 === 'number' && typeof person2 === 'number') {
      return sortDirection * (person1 - person2);
    }

    return 0;
  });
}
