import { SortParam } from '../types/SortParam';
import { Person } from '../types';

export const sortPeople = (
  people: Person[], sortBy: string, order: string,
) => {
  const descOrder = 'desc';

  const isReversed = order === descOrder;
  let resultOfSort: Person[];

  switch (sortBy) {
    case SortParam.Name:
      if (isReversed) {
        resultOfSort = people
          .sort((person1, person2) => person1.name.localeCompare(person2.name))
          .reverse();
      } else {
        resultOfSort = people
          .sort((person1, person2) => person1.name.localeCompare(person2.name));
      }

      break;

    case SortParam.Sex:
      if (isReversed) {
        resultOfSort = people
          .sort((person1, person2) => person1.sex.localeCompare(person2.sex))
          .reverse();
      } else {
        resultOfSort = people
          .sort((person1, person2) => person1.sex.localeCompare(person2.sex));
      }

      break;

    case SortParam.Born:
      if (isReversed) {
        resultOfSort = people
          .sort((person1, person2) => person1.born - person2.born)
          .reverse();
      } else {
        resultOfSort = people
          .sort((person1, person2) => person1.born - person2.born);
      }

      break;

    case SortParam.Died:
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
