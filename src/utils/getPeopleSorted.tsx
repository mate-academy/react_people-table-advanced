import { Person } from '../types';

export type SortParams = 'name' | 'sex' | 'born' | 'died';

export function getPeopleSorted(
  people: Person[],
  sortParams: SortParams | null,
  order: string | null,
) {
  const sortedPeople = [...people];

  if (!sortParams) {
    return sortedPeople;
  }

  sortedPeople.sort((person1, person2) => {
    switch (sortParams) {
      case 'name':
      case 'sex':
        return person1[sortParams].localeCompare(person2[sortParams]);

      case 'born':
      case 'died':
        return person1[sortParams] - person2[sortParams];
    }
  });

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
}
