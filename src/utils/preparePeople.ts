import { Person } from '../types';
import { SortNames } from '../types/SortNames';

export function preparePeople(
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sort: string,
  order: string,
) {
  let preparedPeople = [...people];

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normilezedQuery = query.toLowerCase().trim();

    preparedPeople = preparedPeople
      .filter(({ name, fatherName, motherName }) => (
        name.toLowerCase().includes(normilezedQuery)
        || fatherName?.toLowerCase().includes(normilezedQuery)
        || motherName?.toLowerCase().includes(normilezedQuery)
      ));
  }

  if (centuries.length > 0) {
    preparedPeople = preparedPeople
      .filter(person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ));
  }

  if (sort) {
    preparedPeople.sort((p1, p2) => {
      switch (sort) {
        case SortNames.Name:
        case SortNames.Sex:
          return p1[sort].localeCompare(p2[sort]);

        case SortNames.Born:
        case SortNames.Died:
          return p1[sort] - p2[sort];

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
