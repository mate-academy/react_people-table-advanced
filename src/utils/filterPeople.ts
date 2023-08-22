import { Person } from '../types';

export function filterPeople(
  people: Person[],
  sex: string,
  centuries: number[],
  query: string,
  sort: string,
  order: string,
) {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => (
      centuries.includes(Math.ceil(person.born / 100))
    ));
  }

  if (query) {
    const queryLowerCase = query.toLowerCase();

    filteredPeople = filteredPeople.filter(person => (
      person.name.toLowerCase().includes(queryLowerCase)
      || person.motherName?.toLowerCase().includes(queryLowerCase)
      || person.fatherName?.toLowerCase().includes(queryLowerCase)
    ));
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

    return order === 'desc'
      ? filteredPeople.reverse()
      : filteredPeople;
  }

  return filteredPeople;
}
