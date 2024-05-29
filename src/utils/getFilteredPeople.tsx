import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[],
  query: string,
  centuries: string[],
  sex: string,
) => {
  let filteredPeople = people;

  if (query.includes(' ')) {
    return [];
  }

  if (query) {
    const trimmedQuery = query.trim().toLowerCase();

    filteredPeople = people.filter(
      person =>
        person.name.toLowerCase().includes(trimmedQuery) ||
        (person.fatherName &&
          person.fatherName.toLowerCase().includes(trimmedQuery)) ||
        (person.motherName &&
          person.motherName.toLowerCase().includes(trimmedQuery)),
    );
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person =>
      centuries.includes(Math.ceil(+person.born / 100).toString()),
    );
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  return filteredPeople;
};
