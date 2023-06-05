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
      resultOfSort = people
        .sort((person1, person2) => person1.name.localeCompare(person2.name));
      break;

    case SortParam.Sex:

      resultOfSort = people
        .sort((person1, person2) => person1.sex.localeCompare(person2.sex));
      break;

    case SortParam.Born:

      resultOfSort = people
        .sort((person1, person2) => person1.born - person2.born);
      break;

    case SortParam.Died:

      resultOfSort = people
        .sort((person1, person2) => person1.died - person2.died);
      break;

    default:
      return people;
  }

  if (isReversed) {
    resultOfSort.reverse();
  }

  return resultOfSort;
};
