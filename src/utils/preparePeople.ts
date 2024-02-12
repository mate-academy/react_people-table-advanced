import { Person } from '../types';
import { SortNames } from '../types/SortNames';

const nameMatchesQuery = (
  name: string | undefined | null,
  queryMethod: string,
): boolean => {
  const normalizedQuery = queryMethod.toLowerCase().trim();

  return !!name && name.toLowerCase().includes(normalizedQuery);
};

export function preparePeople(
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sortMethod: string,
  order: string,
) {
  let preparedPeople = [...people];

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  // створити функцію яка буде приймати query та name та буде нормалізувати
  if (query) {
    preparedPeople = preparedPeople
      .filter(({ name, fatherName, motherName }) => (
        nameMatchesQuery(name, query)
        || nameMatchesQuery(fatherName, query)
        || nameMatchesQuery(motherName, query)
      ));
  }

  if (centuries.length > 0) {
    preparedPeople = preparedPeople
      .filter(person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ));
  }

  if (sortMethod) {
    preparedPeople.sort((p1, p2) => {
      switch (sortMethod) {
        case SortNames.Name:
        case SortNames.Sex:
          return p1[sortMethod].localeCompare(p2[sortMethod]);

        case SortNames.Born:
        case SortNames.Died:
          return p1[sortMethod] - p2[sortMethod];

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
