import { Person } from '../types';

export function getPeoplePrepared(
  people: Person[],
  query: string,
  selectedSex: string,
  centuries: string[],
  sortField: string,
  sortOrder: string,
): Person[] {
  let preparedPeople = [...people];

  if (query) {
    const preparedQuery = query.toLowerCase().trim();

    preparedPeople = preparedPeople.filter(person => {
      return person.name.toLowerCase().includes(preparedQuery)
        || person.motherName?.toLowerCase().includes(preparedQuery)
        || person.fatherName?.toLowerCase().includes(preparedQuery);
    });
  }

  if (selectedSex) {
    preparedPeople = preparedPeople.filter(person => {
      return person.sex === selectedSex;
    });
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(person => {
      const bornCent = Math.ceil(person.born / 100);
      const diedCent = Math.ceil(person.died / 100);

      return centuries.includes(`${bornCent}`) || centuries.includes(`${diedCent}`);
    });
  }

  if (sortField) {
    preparedPeople = preparedPeople.sort((item1, item2) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return item1[sortField].localeCompare(item2[sortField]);
        case 'born':
        case 'died':
          return +item1[sortField] - +item2[sortField];
        default:
          return 0;
      }
    });
  }

  if (sortOrder) {
    preparedPeople = preparedPeople.reverse();
  }

  return preparedPeople;
}
