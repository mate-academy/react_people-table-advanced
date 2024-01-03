import { Person } from '../types';

export function getPreparedPeople(
  people: Person[],
  filters: {
    sort: string | null,
    order: string | null,
    sex: string | null,
    query: string,
    centuries: string[],
  },
) {
  const sortFunctions: Record<string, (a: Person, b: Person) => number> = {
    name: (a, b) => a.name.localeCompare(b.name),
    sex: (a, b) => a.sex.localeCompare(b.sex),
    born: (a, b) => a.born - b.born,
    died: (a, b) => a.died - b.died,
  };

  const filteredPeople = people.filter(person => (
    (!filters.sex || person.sex === filters.sex)
    && (!filters.query || (
      person.name.toLowerCase().includes(filters.query.toLowerCase())
    ))
    && (!filters.centuries.length || (
      filters.centuries.includes(`${Math.ceil(person.born / 100)}`)
    ))
  ));

  if (!filters.sort) {
    return filteredPeople;
  }

  if (filters.sort && sortFunctions[filters.sort]) {
    const sortedPeople = [...filteredPeople].sort(sortFunctions[filters.sort]);

    return filters.order === 'desc' ? sortedPeople.reverse() : sortedPeople;
  }

  return people;
}
