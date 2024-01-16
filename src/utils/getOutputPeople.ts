import { QueryPersonComparison } from './QueryPersonComparison';
import { Person } from '../types';
import { SortBy } from '../types/SortBy';

export function getOutputPeople(
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sortBy: string | null,
  sortOrder: string | null,
) {
  let outputPeople = [...people];

  if (sex) {
    outputPeople = outputPeople.filter(person => person.sex === sex);
  }

  if (query) {
    outputPeople = outputPeople.filter(
      person => QueryPersonComparison(query, person),
    );
  }

  if (centuries.length) {
    outputPeople = outputPeople.filter(
      person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ),
    );
  }

  if (sortBy) {
    outputPeople.sort((a, b) => {
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
      outputPeople.reverse();
    }
  }

  return outputPeople;
}
