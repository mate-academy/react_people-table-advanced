import { Person } from '../types';

export const getVisiblePeople = (
  people: Person[],
  centuries: string[],
  sex: string | null,
  query: string | null,
  sortBy: keyof Person | null,
  isReversed: boolean,
) => {
  let filteredPeople = [...people];

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      const personBorn = String(Math.ceil(person.born / 100));

      return centuries.includes(personBorn);
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    filteredPeople = people.filter(person => {
      const preparedQuery = query.trim().toLowerCase();
      const nameToLowerCase = person.name.toLowerCase();
      const motherNameToLowerCase = person.motherName?.toLowerCase();
      const fatherNameToLowerCase = person.fatherName?.toLowerCase();

      return nameToLowerCase.includes(preparedQuery)
        || motherNameToLowerCase?.includes(preparedQuery)
        || fatherNameToLowerCase?.includes(preparedQuery);
    });
  }

  if (sortBy) {
    filteredPeople.sort((firstPerson, secondPerson) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return firstPerson[sortBy].localeCompare(secondPerson[sortBy]);
        case 'born':
        case 'died':
          return firstPerson[sortBy] - secondPerson[sortBy];
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};
