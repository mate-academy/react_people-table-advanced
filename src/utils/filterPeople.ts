import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  query: string | null,
  centuries: string[],
  sex: string | null,
  order: string | null,
  sort: string | null,
) => {
  let visiblePeople = [...people];

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      if (person.name.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }

      return false;
    });
  }

  if (centuries.length !== 0) {
    visiblePeople = visiblePeople.filter(
      person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(
      person => person.sex === sex,
    );
  }

  if (sort) {
    visiblePeople.sort((firstPerson, secondPerson) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return firstPerson[sort].localeCompare(secondPerson[sort]);

        case 'born':
        case 'died':
          return firstPerson[sort] - secondPerson[sort];

        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
