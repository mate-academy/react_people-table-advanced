import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  sex: string | null,
  query: string,
  centuries: string[] | [],
) => {
  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => {
      switch (sex) {
        case 'f':
          return person.sex === 'f';
        case 'm':
          return person.sex === 'm';
        default:
          return true;
      }
    });
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      const preparedQuery = query.toUpperCase();

      return person.name.toUpperCase().includes(preparedQuery)
        || person.fatherName?.toUpperCase().includes(preparedQuery)
        || person.motherName?.toUpperCase().includes(preparedQuery);
    });
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const centuryBorn = Math.ceil(person.born / 100).toString();
      const centuryDied = Math.ceil(person.died / 100).toString();

      return centuries.some(c => c === centuryBorn || c === centuryDied);
    });
  }

  return visiblePeople;
};
