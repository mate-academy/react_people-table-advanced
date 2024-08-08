import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sort: string,
  order: string,
) => {
  let filteredPeople = [...people];

  if (sex && sex !== 'all') {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query.trim()) {
    const lowerQuery = query.toLocaleLowerCase();

    filteredPeople = filteredPeople.filter(
      person =>
        person.name.toLowerCase().includes(lowerQuery) ||
        person.motherName?.toLowerCase().includes(lowerQuery) ||
        person.fatherName?.toLowerCase().includes(lowerQuery),
    );
  }

  if (centuries.length) {
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
          person1.name
            .toLowerCase()
            .localeCompare(person2.name.toLocaleLowerCase()),
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
