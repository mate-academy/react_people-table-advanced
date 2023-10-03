import { Person } from '../types';

function filterByName(person: Person, query: string) {
  const normalizedQuery = query.toLowerCase();

  return person.name.toLowerCase().includes(normalizedQuery)
    || person.fatherName?.toLowerCase().includes(normalizedQuery)
    || person.motherName?.toLowerCase().includes(normalizedQuery);
}

function calculationCentry(year: number) {
  return Math.ceil(year / 100);
}

export function getPreparedPeople(
  people: Person[],
  query: string,
  sex: string | null,
  centuries: string[],
  sortField: string | null,
  order: string | null,
) {
  let copyPeople = [...people];

  if (query) {
    copyPeople = copyPeople.filter(person => filterByName(person, query));
  }

  if (sex) {
    copyPeople = copyPeople.filter(person => {
      return person.sex === sex;
    });
  }

  if (centuries.length) {
    const preparedCentries = centuries.map(Number);

    return copyPeople
      .filter(({ born }) => preparedCentries.includes(calculationCentry(born)));
  }

  if (sortField) {
    copyPeople = copyPeople.sort((person1, person2) => {
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
  }

  if (order) {
    return copyPeople.reverse();
  }

  return copyPeople;
}
