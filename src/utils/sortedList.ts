import { Sort } from '../types/Sort';
import { Person } from '../types';

export const sortedList = (
  people: Person[],
  order: string | null,
  sort: string | null,
) => {
  const sortNumbers = (type: Sort.born | Sort.died) => {
    return people.sort((personA, personB) => {
      return order
        ? personA[type] - personB[type]
        : personB[type] - personA[type];
    });
  };

  const sortStrings = (type: Sort.name | Sort.sex) => {
    return people.sort((personA, personB) => {
      return order
        ? personB[type].localeCompare(personA[type])
        : personA[type].localeCompare(personB[type]);
    });
  };

  switch (sort) {
    case Sort.born:
      return sortNumbers(Sort.born);
    case Sort.died:
      return sortNumbers(Sort.died);
    case Sort.name:
      return sortStrings(Sort.name);
    case Sort.sex:
      return sortStrings(Sort.sex);
    case null:
      return people;
    default:
      return people;
  }
};
