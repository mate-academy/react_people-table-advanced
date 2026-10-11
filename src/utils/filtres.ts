import { Person } from '../types';

type Filters = {
  sex: string;
  query: string;
  centuries: string[];
};

export const filterPeople = (people: Person[], filters: Filters) => {
  return people.filter(person => {
    const matchesSex =
      filters.sex === 'All' ||
      person.sex === filters.sex.toLowerCase().charAt(0);

    const query = filters.query.toLowerCase().trim();

    const matchesQuery =
      person.name.toLowerCase().includes(query) ||
      person.motherName?.toLowerCase().includes(query) ||
      person.fatherName?.toLowerCase().includes(query);

    const matchesCentury =
      filters.centuries.length === 0 ||
      (person.born !== null &&
        filters.centuries.includes(Math.ceil(person.born / 100).toString()));

    return matchesSex && matchesQuery && matchesCentury;
  });
};
