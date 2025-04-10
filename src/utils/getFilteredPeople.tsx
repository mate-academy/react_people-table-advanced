import { Person } from '../types';

type FilterParams = {
  query: string;
  sexFilter: string | null;
  sortBy: string | null;
  centuries: string[];
  order: string | null;
};

export const getFilteredPeople = (
  people: Person[],
  filters: FilterParams,
): Person[] => {
  const { query, sexFilter, sortBy, centuries, order } = filters;
  let preparedPeople = [...people];

  if (query) {
    const q = query.trim().toLowerCase();

    preparedPeople = preparedPeople.filter(person => {
      return (
        person.name.toLowerCase().includes(q) ||
        person.motherName?.toLowerCase().includes(q) ||
        person.fatherName?.toLowerCase().includes(q)
      );
    });
  }

  if (sexFilter) {
    preparedPeople = preparedPeople.filter(person => person.sex === sexFilter);
  }

  if (centuries && centuries.length > 0) {
    preparedPeople = preparedPeople.filter(person => {
      const birthCentury = Math.floor(person.born / 100) + 1;

      return centuries.includes(String(birthCentury));
    });
  }

  if (sortBy) {
    preparedPeople = preparedPeople.sort((person1, person2) => {
      switch (sortBy) {
        case 'name':
          return person1.name.localeCompare(person2.name);
        case 'sex':
          return person1.sex.localeCompare(person2.sex);
        case 'born':
          return person1.born - person2.born;
        case 'died':
          return person1.died - person2.died;
        default:
          return 0;
      }
    });
    if (order === 'desc') {
      preparedPeople = preparedPeople.reverse();
    }
  }

  return preparedPeople;
};
