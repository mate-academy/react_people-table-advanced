import { Person } from '../types';
import { SortNames } from '../enums/SortNames';

const nameMatchesQuery = (
  name: string | undefined | null,
  queryMethod: string,
): boolean => {
  const normalizedQuery = queryMethod.toLowerCase().trim();

  return !!name && name.toLowerCase().includes(normalizedQuery);
};

const filterPeople = (
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
): Person[] => {
  return people
    .filter(person => (!sex || person.sex === sex)
      && (!query || [person.name, person.fatherName, person.motherName]
        .some(name => nameMatchesQuery(name, query)))
      && (centuries.length === 0 || centuries
        .includes(Math.ceil(person.born / 100).toString())));
};

const sortPeople = (
  people: Person[],
  sortMethod: string,
  orderMethod: string,
): Person[] => {
  const sortedPeople = [...people];

  if (sortMethod) {
    sortedPeople.sort((p1, p2) => {
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

  if (orderMethod) {
    sortedPeople.reverse();
  }

  return sortedPeople;
};

export function preparePeople(
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sortMethod: string,
  orderMethod: string,
) {
  const preparedPeople = filterPeople(people, sex, query, centuries);

  return sortPeople(preparedPeople, sortMethod, orderMethod);
}
