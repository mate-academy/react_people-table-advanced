import { Person } from '../types';
import { SortBy } from '../types/SortBy';

export function PreparePeople(
  people: Person[],
  centuries: string[],
  isReversed: boolean,
  query?: string,
  sex?: string,
  sortBy?: SortBy,
): Person[] | [] {
  let preparedPeople = [...people];

  if (query) {
    preparedPeople = preparedPeople.filter(person => {
      const nameLower = person.name.toLowerCase()
    + person.fatherName?.toLowerCase()
    + person.motherName?.toLowerCase();
      const queryLower = query.toLowerCase();

      return nameLower.includes(queryLower);
    });
  }

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(person => {
      const personCentury = Math.ceil(person.born / 100).toString();

      return centuries.includes(personCentury);
    });
  }

  if (sortBy) {
    preparedPeople.sort((a, b) => {
      switch (sortBy) {
        case SortBy.Name:
        case SortBy.Sex:
          return a[sortBy].localeCompare(b[sortBy]);
        case SortBy.Born:
        case SortBy.Died:
          return a[sortBy] - b[sortBy];
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedPeople.reverse();
  }

  return preparedPeople;
}
