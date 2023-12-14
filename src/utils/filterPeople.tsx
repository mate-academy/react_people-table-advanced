import { matchesQuery } from '../helpers/matchesQuery';
import { Person } from '../types';
import { SortField } from '../types/SortField';

export function filterPeople(
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[],
  sortField: string | null,
  isReversed: boolean,
) {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => centuries
      .includes(Math.ceil(person.born / 100).toString()));
  }

  if (query !== null) {
    filteredPeople = filteredPeople
      .filter(person => matchesQuery(person, query));
  }

  if (sortField) {
    filteredPeople.sort((a, b) => {
      switch (sortField) {
        case SortField.name:
        case SortField.sex:
          return a[sortField].localeCompare(b[sortField]);

        case SortField.born:
        case SortField.died:
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });

    if (isReversed) {
      filteredPeople.reverse();
    }
  }

  return filteredPeople;
}
