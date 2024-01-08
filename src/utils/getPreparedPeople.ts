import { QueryPersonComparison } from '../helpers/QueryPersonComparison';
import { Person } from '../types';
import { SortBy } from '../types/SortBy';

export function getPreparedPeople(
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sortBy: string | null,
  sortOrder: string | null,
) {
  let preparedPeople = [...people];

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (query) {
    preparedPeople = preparedPeople.filter(
      person => QueryPersonComparison(query, person),
    );
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(
      person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ),
    );
  }

  if (sortBy) {
    preparedPeople.sort((a, b) => {
      switch (sortBy) {
        case SortBy.name:
        case SortBy.sex:
          return a[sortBy].localeCompare(b[sortBy]);

        case SortBy.born:
        case SortBy.died:
          return a[sortBy] - b[sortBy];

        default:
          return 0;
      }
    });

    if (sortOrder) {
      preparedPeople.reverse();
    }
  }

  return preparedPeople;
}
