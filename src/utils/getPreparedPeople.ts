import { Person } from '../types';

export function getPreparedPeople(
  people: Person[],
  selectedSex: string,
  query: string,
  centuries: string[],
  sortField: string,
  sortOrder: string,
): Person[] {
  let preparedPeople = [...people];

  if (selectedSex) {
    preparedPeople = preparedPeople
      .filter(person => person.sex === selectedSex);
  }

  if (query) {
    const preparedQuery = query.toLowerCase().trim();

    preparedPeople = preparedPeople.filter(person => {
      return person.name.toLowerCase().includes(preparedQuery)
        || person.motherName?.toLowerCase().includes(preparedQuery)
        || person.fatherName?.toLowerCase().includes(preparedQuery);
    });
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(person => {
      const centuryBorn = Math.ceil(person.born / 100);
      const centuryDied = Math.ceil(person.died / 100);

      return centuries.includes(`${centuryBorn}`) || centuries.includes(`${centuryDied}`);
    });
  }

  if (sortField) {
    preparedPeople.sort((item1, item2) => {
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

    if (sortOrder) {
      preparedPeople = preparedPeople.reverse();
    }
  }

  return preparedPeople;
}
