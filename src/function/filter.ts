import { Person } from '../types';
import { FILTER } from '../types/filters';

export function filter(
  people: Person[],
  filterSex: FILTER,
  query: string,
  centuries: string[],
): Person[] {
  let filteredPeople = [...people];

  switch (filterSex) {
    case FILTER.MALE:
      filteredPeople = filteredPeople.filter(person => person.sex === 'm');
      break;

    case FILTER.FEMALE:
      filteredPeople = filteredPeople.filter(person => person.sex === 'f');
      break;

    case FILTER.ALL:
    default:
      break;
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      return (
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const personCentury = Math.ceil(person.born / 100).toString();

      return centuries.includes(personCentury);
    });
  }

  return filteredPeople;
}
