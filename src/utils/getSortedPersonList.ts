import { Person } from '../types';
import { SortType } from '../types/SortType';

export function getSortedPersonList(data: Person[], sort: string) {
  const resultData = [...data].sort((person1, person2) => {
    switch (sort) {
      case SortType.NAME:
      case SortType.SEX:
        return person1[sort].localeCompare(person2[sort]);

      case SortType.DIED:
      case SortType.BORN:
        return person1[sort] - person2[sort];

      default:
        return 0;
    }
  });

  return resultData;
}
