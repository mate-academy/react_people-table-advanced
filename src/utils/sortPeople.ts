import { Person } from '../types/Person';

export const sortPeople = (
  persons: Person[],
  field: keyof Person,
  order: string,
): Person[] => {
  return [...persons].sort((person1, person2) => {
    const valueA = person1[field];
    const valueB = person2[field];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return order === 'desc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return order === 'desc' ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });
};
