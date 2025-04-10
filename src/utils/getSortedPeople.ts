import { Person } from '../types';
import { SortOptions, SortOrder } from '../types/SortOptions';

export function getSortedPeople(
  people: Person[],
  sortParam: SortOptions | null,
  sortOrderParam: SortOrder | null,
): Person[] {
  if (!sortParam) {
    return people;
  }

  const preparingPeople = [...people].sort((person1, person2) => {
    switch (sortParam) {
      case SortOptions.NAME:
        return person1.name.localeCompare(person2.name);
      case SortOptions.SEX:
        return person1.sex.localeCompare(person2.sex);
      case SortOptions.BORN:
        return person1.born - person2.born;
      case SortOptions.DIED:
        return person1.died - person2.died;
      default:
        return 0;
    }
  });

  return sortOrderParam === 'desc' ? preparingPeople.reverse() : preparingPeople;
}

