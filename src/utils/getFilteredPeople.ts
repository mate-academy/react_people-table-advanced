import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sortField: string | null,
  order: string | null,
): Person[] => {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    const getCentury = (person: Person) => Math.ceil(person.born / 100);

    filteredPeople = filteredPeople.filter(person => centuries.includes(
      getCentury(person).toString(),
    ));
  }

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    filteredPeople = filteredPeople.filter((person) => {
      const searchableStrings = [
        person.name,
        person.motherName || '',
        person.fatherName || '',
      ];

      const combinedString = searchableStrings.join(' ').toLocaleLowerCase();

      return combinedString.includes(lowerQuery);
    });
  }

  if (sortField) {
    filteredPeople.sort((person1, person2) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return person1[sortField].localeCompare(person2[sortField]);

        case 'born':
        case 'died':
          return person1[sortField] - person2[sortField];

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      filteredPeople.reverse();
    }
  }

  return filteredPeople;
};
