import { Person } from '../types';

// Constants for sorting fields
const SORT_FIELDS = {
  NAME: 'name',
  SEX: 'sex',
  BORN: 'born',
  DIED: 'died',
} as const;

export const getFilteredPeople = (
  people: Person[],
  filters: URLSearchParams,
) => {
  let filteredPeople = [...people];

  const query = filters.get('query') || '';
  const centuries = filters.getAll('centuries') || [];
  const sex = filters.get('sex') || '';
  const sort = filters.get('sort') || '';
  const order = filters.get('order') || '';

  if (query) {
    const preparedQuery = query.trim().toLowerCase();

    filteredPeople = filteredPeople.filter(person => {
      const preparedName = person.name.toLowerCase();
      const preparedMotherName = person.motherName?.toLowerCase();
      const preparedFatherName = person.fatherName?.toLowerCase();

      return (
        preparedName.includes(preparedQuery)
        || preparedMotherName?.includes(preparedQuery)
        || preparedFatherName?.includes(preparedQuery)
      );
    });
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      const centuryBorn = String(Math.floor(person.born / 100) + 1);

      return centuries.includes(centuryBorn);
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  filteredPeople.sort((a, b) => {
    switch (sort) {
      case SORT_FIELDS.NAME:
      case SORT_FIELDS.SEX:
        return a[sort].localeCompare(b[sort]);
      case SORT_FIELDS.BORN:
      case SORT_FIELDS.DIED:
        return a[sort] - b[sort];
      default:
        return 0;
    }
  });

  if (order === 'desc') {
    filteredPeople.reverse();
  }

  return filteredPeople;
};
