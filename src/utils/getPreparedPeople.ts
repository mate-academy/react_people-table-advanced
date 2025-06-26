import { Person } from '../types/Person';

export const getPreparedPeople = (
  people: Person[],
  filters: URLSearchParams,
) => {
  const query = filters.get('query') || '';
  const sex = filters.get('sex') || '';
  const centuries = filters.getAll('centuries').map(Number);
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
      const bornCentury = Math.ceil(person.born / 100);

      return centuries.includes(bornCentury);
    });
  }

  if (sort) {
    filteredPeople.sort((a, b) => {
      const aValue = a[sort as keyof Person];
      const bValue = b[sort as keyof Person];

      if (aValue == null && bValue == null) {
        return 0;
      }

      if (aValue == null) {
        return 1;
      }

      if (bValue == null) {
        return -1;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return order === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }

  return filteredPeople;
};
