import { Person } from '../types';

export function getPreparedPersons(
  persons: Person[],
  centuries: string[],
  query: string,
  sex: string,
  sortField: keyof Person,
  order: string,
): Person[] {
  let preparedPersons = [...persons];

  if (centuries.length) {
    preparedPersons = preparedPersons.filter(person => {
      const toCentury = Math.ceil(person.born / 100).toString();

      return centuries.includes(toCentury);
    });
  }

  if (query.trim()) {
    preparedPersons = preparedPersons.filter(person => {
      const preparedQuery = query.toLowerCase().trim();
      const nameToLower = person.name.toLowerCase();
      const motherNameToLower = person.motherName?.toLowerCase();
      const fatherNameToLower = person.fatherName?.toLowerCase();

      return nameToLower.includes(preparedQuery)
        || motherNameToLower?.includes(preparedQuery)
        || fatherNameToLower?.includes(preparedQuery);
    });
  }

  if (sex) {
    preparedPersons = preparedPersons.filter(person => person.sex === sex);
  }

  if (sortField) {
    preparedPersons.sort((a, b) => {
      const personA = order === 'desc' ? b[sortField] : a[sortField];
      const personB = order === 'desc' ? a[sortField] : b[sortField];

      if (typeof personA === 'number' && typeof personB === 'number') {
        return personA - personB;
      }

      if (typeof personA === 'string' && typeof personB === 'string') {
        return personA.localeCompare(personB);
      }

      return 0;
    });
  }

  return preparedPersons;
}
