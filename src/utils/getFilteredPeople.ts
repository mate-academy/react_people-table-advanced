import { Filters, Person } from '../types';

export function getFilteredPeople(
  people: Person[],
  filters: Filters,
): Person[] {
  let result = [...people];
  const { sex, query, centuries } = filters;

  if (sex) {
    result = result.filter(person => person.sex === sex);
  }

  if (query) {
    result = result.filter(person =>
      [person.name, person.motherName, person.fatherName].some(field =>
        field?.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }

  if (centuries.length) {
    result = result.filter(person => {
      const bornCentury = Math.ceil(person.born / 100);

      return centuries.includes(bornCentury);
    });
  }

  return result;
}
