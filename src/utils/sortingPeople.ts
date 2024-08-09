import { Person, AboutPerson, Constans } from '../types';

export const sortPeople = (
  people: Person[],
  sort: string | null,
  direction: string | null,
): Person[] => {
  const sortedPeople = [...people].sort((firstPerson, secondPerson) => {
    switch (sort) {
      case AboutPerson.NAME:
      case AboutPerson.SEX:
        return firstPerson[sort].localeCompare(secondPerson[sort]);
      case AboutPerson.BORN:
      case AboutPerson.DIED:
        return firstPerson[sort] - secondPerson[sort];
      default:
        return 0;
    }
  });

  if (direction === Constans.DESC) {
    sortedPeople.reverse();
  }

  return sortedPeople;
};
