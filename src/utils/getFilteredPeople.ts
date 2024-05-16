import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
  sort: string,
  order: string,
) => {
  let visiblePeople = [...people];

  if (query) {
    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);
        case 'born':
        case 'died':
          return a[sort] - b[sort];
        default:
          return 0;
      }
    });
  }

  if (order) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
