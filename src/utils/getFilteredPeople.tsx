import { Person } from '../types';
import { SortParams } from '../types/sortParams';

type Params = {
  query: string;
  century: string[];
  filterSex: string;
  sort: SortParams;
  order: string;
};

export function getFilteredPeople(people: Person[], params: Params) {
  let filtered: Person[] = [...people];

  if (params.query.length) {
    const searchesKeys: Array<keyof Person> = [
      'name',
      'fatherName',
      'motherName',
    ];
    const query = params.query.toLowerCase().trim();

    filtered = filtered.filter(person =>
      searchesKeys.some(key =>
        (person[key] as string)?.toLowerCase().includes(query),
      ),
    );
  }

  if (params.filterSex) {
    filtered = filtered.filter(person => person.sex === params.filterSex);
  }

  if (params.century.length) {
    const centuriesAsNumbers = params.century.map(Number);

    filtered = filtered.filter(person =>
      centuriesAsNumbers.includes(Math.ceil(person.born / 100)),
    );
  }

  if (params.sort) {
    const sortedBy: SortParams = params.sort;
    const sorted = filtered;

    if (sortedBy === 'died' || sortedBy === 'born') {
      sorted.sort((person1, person2) => person1[sortedBy] - person2[sortedBy]);
    } else {
      sorted.sort((person1, person2) =>
        person1[sortedBy].localeCompare(person2[sortedBy]),
      );
    }

    if (params.order) {
      sorted.reverse();
    }

    filtered = sorted;
  }

  return filtered;
}
