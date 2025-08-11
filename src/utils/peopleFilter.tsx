import { Person } from '../types/Person';

export const peopleFilter = (
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sort: string,
  order: string,
) => {
  let getFilteredPeople = [...people];

  if (query && query.trim()) {
    const queryLowered = query.toLowerCase();

    getFilteredPeople = getFilteredPeople.filter(
      person =>
        person.name.toLowerCase().includes(queryLowered) ||
        person.motherName?.toLowerCase().includes(queryLowered) ||
        person.fatherName?.toLowerCase().includes(queryLowered),
    );
  }

  if (sex && sex !== 'all') {
    getFilteredPeople = getFilteredPeople.filter(person => person.sex === sex);
  }

  if (centuries && centuries.length) {
    getFilteredPeople = getFilteredPeople.filter(person =>
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
        getFilteredPeople.sort((person1, person2) =>
          person1.name.toLowerCase().localeCompare(person2.name.toLowerCase()),
        );
        break;

      case 'born':
      case 'died':
        getFilteredPeople.sort(
          (person1, person2) => +person1[sort] - +person2[sort],
        );
        break;

      case 'sex':
        getFilteredPeople.sort((person1, person2) =>
          person1.sex.localeCompare(person2.sex),
        );
        break;
    }
  }

  if (order) {
    getFilteredPeople.reverse();
  }

  return getFilteredPeople;
};
