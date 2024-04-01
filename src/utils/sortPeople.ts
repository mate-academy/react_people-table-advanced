import { Person } from '../types';

export function sortPeople(
  people: Person[],
  sortedField: string | null,
  order: 'asc' | 'desc',
) {
  if (!sortedField) {
    return people;
  }

  return [...people].sort((firstPerson, secondPerson) => {
    if (!(sortedField in firstPerson) || !(sortedField in secondPerson)) {
      return 0;
    }

    const firstSortedField = firstPerson[sortedField as keyof Person];
    const secondSortedField = secondPerson[sortedField as keyof Person];
    const multiplier = order === 'asc' ? 1 : -1;

    if (
      typeof firstSortedField === 'number' &&
      typeof secondSortedField === 'number'
    ) {
      return firstSortedField - secondSortedField * multiplier;
    }

    if (
      typeof firstSortedField === 'string' &&
      typeof secondSortedField === 'string'
    ) {
      return firstSortedField.localeCompare(secondSortedField) * multiplier;
    }

    return 0;
  });
}
