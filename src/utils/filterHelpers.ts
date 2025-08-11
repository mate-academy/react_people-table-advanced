import { Person } from '../types';

export const filterBySex = (people: Person[], sex: string) => {
  return sex ? people.filter(person => person.sex === sex) : people;
};

export const filterByQuery = (people: Person[], query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!query) {
    return people;
  }

  return people.filter(person =>
    person.name.toLowerCase().includes(normalizedQuery),
  );
};

export const filterByCenturies = (people: Person[], centuries: string[]) => {
  if (!centuries.length) {
    return people;
  }

  return people.filter(person =>
    centuries.some(century => Math.ceil(person.born / 100) === +century),
  );
};
