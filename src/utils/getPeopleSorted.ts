import { Person, SortValues } from '../types';

export function getPeopleSorted(sort: string, order: string, people: Person[]) {
  const preparedPeople = [...people];

  if (sort) {
    preparedPeople.sort((a, b) => {
      switch (sort) {
        case SortValues.Name:
          return a.name.localeCompare(b.name);
        case SortValues.Sex:
          return a.sex.localeCompare(b.sex);
        case SortValues.Born:
          return a.born - b.born;
        case SortValues.Died:
          return a.died - b.died;
        default:
          return 0;
      }
    });
  }

  if (order) {
    preparedPeople.reverse();
  }

  return preparedPeople;
}
