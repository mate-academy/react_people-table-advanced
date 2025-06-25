import { Person } from '../types';
type SortableKey = 'name' | 'sex' | 'born' | 'died';

export const getPreparedPeople = (
  people: Person[],
  filters: URLSearchParams,
) => {
  const query = filters.get('query') || '';
  const sex = filters.get('sex') || '';
  const centuries = filters.getAll('centuries').map(Number) || [];
  const column = filters.get('sort') as SortableKey | null;
  const order = filters.get('order') || '';

  if (!query && !sex && !centuries.length) {
    return people;
  }

  const filteredPeople = people.filter(person => {
    const matchesQuery = person.name.trim().toLowerCase().includes(query);
    const matchesSex = sex ? person.sex === sex : person;

    const birthCentury = Math.ceil(person.born / 100);
    const matchesCentury = centuries.length
      ? centuries.includes(birthCentury)
      : true;

    return matchesCentury && matchesQuery && matchesSex;
  });

  if (!column) {
    return filteredPeople;
  }

  return [...filteredPeople].sort((person1, person2) => {
    const person1Col = person1[column];
    const person2Col = person2[column];

    if (typeof person1Col === 'number' && typeof person2Col === 'number') {
      if (!order) {
        return person1Col - person2Col;
      }

      return person2Col - person1Col;
    }

    if (typeof person1Col === 'string' && typeof person2Col === 'string') {
      if (!order) {
        return person1Col.localeCompare(person2Col);
      }

      return person2Col.localeCompare(person1Col);
    }

    return 0;
  });
};
