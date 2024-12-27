import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sort: string,
  order: string,
) => {
  let filteredPeople = [...people];

  if (query && query.trim()) {
    const queryToLower = query.toLowerCase();

    filteredPeople = filteredPeople.filter(
      person =>
        person.name.toLowerCase().includes(queryToLower) ||
        person.motherName?.toLowerCase().includes(queryToLower) ||
        person.fatherName?.toLowerCase().includes(queryToLower),
    );
  }

  if (sex && sex !== 'all') {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries && centuries.length) {
    filteredPeople = filteredPeople.filter(person =>
      centuries.some(
        century =>
          +century * 100 - 100 <= person.born &&
          person.born <= +century * 100 - 1,
      ),
    );
  }

  if (sort) {
    switch (sort) {
      case 'name':
        filteredPeople.sort((person1, person2) =>
          person1.name.toLowerCase().localeCompare(person2.name.toLowerCase()),
        );
        break;

      case 'born':
      case 'died':
        filteredPeople.sort(
          (person1, person2) => +person1[sort] - +person2[sort],
        );
        break;

      case 'sex':
        filteredPeople.sort((person1, person2) =>
          person1.sex.localeCompare(person2.sex),
        );
        break;
    }
  }

  if (order) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};
