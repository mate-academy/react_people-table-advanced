import { Person } from '../types';

export const sortPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
) => {
  let copyPeople = [...people];

  if (sort) {
    switch (sort) {
      case 'name':
      case 'sex':
        copyPeople = copyPeople.sort(
          (person1, person2) => person1[sort].localeCompare(person2[sort]),
        );
        break;

      case 'born':
      case 'died':
        copyPeople = copyPeople.sort(
          (person1, person2) => person1[sort] - person2[sort],
        );
        break;

      default:
        return people;
    }
  }

  if (order) {
    copyPeople.reverse();
  }

  return copyPeople;
};
