import { Person } from '../types';
import { DescOrder, SortType } from '../types/SortTypes';

export const SortPeople = (
  people: Person[], sortBy: string, order: string,
) => {
  const isReversed = order === DescOrder;
  let resultOfSort: Person[];

  switch (sortBy) {
    case SortType.Name:
      if (isReversed) {
        resultOfSort = people
          .sort((person1, person2) => person1.name.localeCompare(person2.name))
          .reverse();
      } else {
        resultOfSort = people
          .sort((person1, person2) => person1.name.localeCompare(person2.name));
      }

      break;

    case SortType.Sex:
      if (isReversed) {
        resultOfSort = people
          .sort((person1, person2) => person1.sex.localeCompare(person2.sex))
          .reverse();
      } else {
        resultOfSort = people
          .sort((person1, person2) => person1.sex.localeCompare(person2.sex));
      }

      break;

    case SortType.Born:
      if (isReversed) {
        resultOfSort = people
          .sort((person1, person2) => person1.born - person2.born)
          .reverse();
      } else {
        resultOfSort = people
          .sort((person1, person2) => person1.born - person2.born);
      }

      break;

    case SortType.Died:
      if (isReversed) {
        resultOfSort = people
          .sort((person1, person2) => person1.died - person2.died)
          .reverse();
      } else {
        resultOfSort = people
          .sort((person1, person2) => person1.died - person2.died);
      }

      break;

    default:
      return people;
  }

  return resultOfSort;
};
