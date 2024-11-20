import { Person } from '../types';

export function getPeopleSorted(
  people: Person[],
  sort: string | null,
  order: string | null,
) {
  let sortedPeople = [...people];

  if (sort) {
    sortedPeople = sortedPeople.sort((person1: Person, person2: Person) => {
      const currValue = person1[sort as keyof Person];
      const nextValue = person2[sort as keyof Person];

      let direction = 0;

      if (typeof currValue === 'string' && typeof nextValue === 'string') {
        direction = currValue.localeCompare(nextValue);
      }

      if (typeof currValue === 'number' && typeof nextValue === 'number') {
        direction = currValue - nextValue;
      }

      return order === 'desc' ? direction * -1 : direction * 1;
    });
  }

  return sortedPeople;
}
