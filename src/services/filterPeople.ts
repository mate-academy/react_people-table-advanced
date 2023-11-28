import { Person } from '../types';
import { SortParams } from '../types/SortParams';

export const filterPeople = (
  people: Person[],
  query: string,
  sex: string | null,
  centuries: string[],
  sort: string | null,
  order: string | null,
) => {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => centuries
      .includes(Math.ceil(person.born / 100).toString()));
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    filteredPeople
        = filteredPeople.filter(person => person.name.toLowerCase()
        .includes(query))
        || filteredPeople.filter(person => person.motherName?.toLowerCase()
          .includes(normalizedQuery))
        || filteredPeople.filter(person => person.fatherName?.toLowerCase()
          .includes(normalizedQuery));
  }

  if (sort) {
    filteredPeople.sort((a, b) => {
      switch (sort) {
        case SortParams.NAME:
        case SortParams.SEX:
          return a[sort].localeCompare(b[sort]);
        case SortParams.BORN:
        case SortParams.DIED:
          return a[sort] - b[sort];
        default: return 0;
      }
    });
  }

  if (order) {
    return filteredPeople.reverse();
  }

  return filteredPeople;
};
