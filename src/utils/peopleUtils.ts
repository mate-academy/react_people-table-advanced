import { Person, SortField, SortOrder } from '../types';

type PeopleFilters = {
  sex: string;
  query: string;
  centuries: string[];
};

export const filterPeople = (
  people: Person[],
  filters: PeopleFilters,
): Person[] => {
  return people.filter(person => {
    if (filters.sex && person.sex !== filters.sex) {
      return false;
    }

    if (filters.centuries.length > 0) {
      const century = Math.ceil(person.born / 100).toString();

      if (!filters.centuries.includes(century)) {
        return false;
      }
    }

    if (filters.query) {
      const searchText = [
        person.name,
        person.fatherName || '',
        person.motherName || '',
      ]
        .join(' ')
        .toLowerCase();

      if (!searchText.includes(filters.query.toLowerCase())) {
        return false;
      }
    }

    return true;
  });
};

export const sortPeople = (
  people: Person[],
  sortField: SortField,
  order: SortOrder = 'asc',
): Person[] => {
  if (!sortField) {
    return people;
  }

  return [...people].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];

    let comparison = 0;

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      comparison = valueA.localeCompare(valueB);
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      comparison = valueA - valueB;
    }

    return order === 'desc' ? -comparison : comparison;
  });
};
