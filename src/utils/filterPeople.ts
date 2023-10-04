import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sortField: string | null,
  order: string | null,
) => {
  let tempPeople = [...people];

  if (sex) {
    tempPeople = tempPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    const getCentury = (person: Person) => Math.ceil(person.born / 100);

    tempPeople = tempPeople.filter(
      person => centuries.includes(
        getCentury(person).toString(),
      ),
    );
  }

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    tempPeople = tempPeople.filter((person) => {
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
    tempPeople.sort((a, b) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return a[sortField].localeCompare(b[sortField]);

        case 'born':
        case 'died':
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      tempPeople.reverse();
    }
  }

  return tempPeople;
};
