import { Person } from '../types';

export const getVisiblePeople = (
  people: Person[],
  filters: URLSearchParams,
) => {
  const query = filters.get('query') || '';
  const sex = filters.get('sex') || '';
  const centuries = filters.getAll('centuries').map(Number).filter(Boolean);
  const sort = filters.get('sort') || null;
  const order = filters.get('order') || '';
  let filteredPeople = [...people];

  if (query) {
    filteredPeople = filteredPeople.filter(person =>
      person.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(century);
    });
  }

  if (sort) {
    filteredPeople.sort((a, b) => {
      let result = 0;

      if (sort === 'name' || sort === 'sex') {
        result = a[sort].localeCompare(b[sort]);
      } else if (sort === 'born' || sort === 'died') {
        result = a[sort] - b[sort];
      }

      return order === 'desc' ? -result : result;
    });
  }

  return filteredPeople;
};
