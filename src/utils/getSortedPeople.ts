import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  sort: keyof Person,
  order: string,
) => {
  const orderedPeople = [...people].sort((personA, personB) => {
    let result = 0;

    if (sort === 'name' || sort === 'sex') {
      result = personA[sort].localeCompare(personB[sort]);
    }

    if (sort === 'born' || sort === 'died') {
      result = personA[sort] - personB[sort];
    }

    return order === 'asc' ? result : result * -1;
  });

  return orderedPeople;
};
