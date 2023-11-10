import { Person } from '../types';

export const filteredPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[],
  sort: string,
  order: string,
) => {
  let preparedPeople = [...people];

  if (query) {
    const preparedQuery = query.trim().toLowerCase();

    preparedPeople = preparedPeople.filter((person: Person) => {
      if (person.name.toLowerCase().includes(preparedQuery)
      || person.fatherName?.toLowerCase().includes(preparedQuery)
      || person.motherName?.toLowerCase().includes(preparedQuery)) {
        return true;
      }

      return false;
    });
  }

  if (sex) {
    preparedPeople = preparedPeople.filter((person: Person) => person.sex
    === sex);
  }

  if (centuries.length > 0) {
    preparedPeople = preparedPeople.filter((person) => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });
  }

  if (sort) {
    preparedPeople.sort((personA: Person, personB: Person) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return order !== 'desc'
            ? personA[sort].localeCompare(personB[sort])
            : personB[sort].localeCompare(personA[sort]);

        case 'born':
        case 'died':
          return order !== 'desc'
            ? personA[sort] - personB[sort]
            : personB[sort] - personA[sort];

        default:
          throw new Error(
            'There are no people matching the current search criteria',
          );
      }
    });
  }

  return preparedPeople;
};
