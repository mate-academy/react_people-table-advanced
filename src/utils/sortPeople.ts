import { Person } from '../types';

export default function sortPeople(
  array: Person[],
  sortType: keyof Person,
  sortOrder: string,
): Person[] {
  if (sortOrder === 'default') {
    return array;
  }

  return [...array].sort((person1, person2) => {
    let result = 0;
    const valueA = person1[sortType];
    const valueB = person2[sortType];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      result = valueA.localeCompare(valueB);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      result = valueA - valueB;
    }

    return sortOrder === 'asc' ? result : result * -1;
  });
}
