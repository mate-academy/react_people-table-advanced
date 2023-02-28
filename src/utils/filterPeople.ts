import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  sex: string | null,
  searchQuery: string | null,
  century: string[],
  sort: string | null,
  order: string | null,
) => {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (searchQuery) {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    filteredPeople = filteredPeople.filter(person => {
      const stringForSearch = `${person.name}${person.motherName}${person.fatherName}`.toLowerCase();

      return stringForSearch.includes(normalizedQuery);
    });
  }

  if (century.length !== 0) {
    filteredPeople = filteredPeople.filter(person => {
      const bornCentury = Math.ceil(person.born / 100).toString();

      return century.includes(bornCentury);
    });
  }

  if (sort) {
    filteredPeople.sort((person1, person2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return person1[sort].localeCompare(person2[sort]);
        case 'born':
        case 'died':
          return person1[sort] - person2[sort];
        default:
          return 0;
      }
    });
  }

  if (order) {
    filteredPeople.reverse();
  }

  // eslint-disable-next-line no-console
  console.log('filterd');

  return filteredPeople;
};
