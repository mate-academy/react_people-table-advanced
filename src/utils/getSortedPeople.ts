import { Person, Sort } from '../types';

export const getSortedPeople = (
  people: Person[],
  sort: string,
  order: string,
) => {
  const sortedPeople = [...people];

  if (sort) {
    switch (sort) {
      case Sort.Sex:
      case Sort.Name:
        sortedPeople.sort((person1, person2) =>
          person1[sort]
            .toLowerCase()
            .localeCompare(person2[sort].toLocaleLowerCase()),
        );
        break;

      case Sort.Born:
      case Sort.Died:
        sortedPeople.sort(
          (person1, person2) => Number(person1[sort]) - Number(person2[sort]),
        );
        break;
    }
  }

  if (order) {
    sortedPeople.reverse();
  }

  return sortedPeople;
};
