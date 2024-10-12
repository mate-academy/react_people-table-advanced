import { Person } from '../types';
import { Sort } from '../types/Sort';

export function getFilteredPeople(
  people: Person[],
  {
    sort,
    order,
    query,
    sex,
    centuries,
  }: {
    sort: string | null;
    order: string | null;
    query: string;
    sex: string;
    centuries: string[];
  },
) {
  let filteredPeople = [...people];
  const normilizeQuery = query.toLowerCase();

  if (sort) {
    filteredPeople.sort((p1, p2) => {
      switch (sort) {
        case Sort.Name:
        case Sort.Sex:
          return p1[sort].localeCompare(p2[sort]);
        case Sort.Born:
        case Sort.Died:
          return p1[sort] - p2[sort];
        default:
          return 0;
      }
    });
  }

  if (order) {
    filteredPeople.reverse();
  }

  if (query) {
    filteredPeople = filteredPeople.filter(
      p =>
        p.name.toLowerCase().includes(normilizeQuery) ||
        (p.motherName && p.motherName.toLowerCase().includes(normilizeQuery)) ||
        (p.fatherName && p.fatherName.toLowerCase().includes(normilizeQuery)),
    );
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(p => p.sex === sex);
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });
  }

  return filteredPeople;
}
