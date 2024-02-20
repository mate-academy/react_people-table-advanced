import { Filters, Person } from '../types';

export function filterAndSort(
  people: Person[],
  {
    sex, query, centuries, sort, order,
  }: Filters,
) {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    filteredPeople = filteredPeople
      .filter(person => person.name.toLowerCase().includes(normalizedQuery)
      || person.motherName?.toLowerCase().includes(normalizedQuery)
      || person.fatherName?.toLowerCase().includes(normalizedQuery));
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      const personBirthCentury = Math.ceil(person.born / 100);
      const personDeathCentury = Math.ceil(person.died / 100);

      return centuries.includes(personBirthCentury.toString())
      || centuries.includes(personDeathCentury.toString());
    });
  }

  if (sort) {
    filteredPeople = filteredPeople.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);
        case 'born':
        case 'died':
          return a[sort] - b[sort];
        default:
          return 0;
      }
    });
  }

  if (order) {
    filteredPeople = filteredPeople.reverse();
  }

  return filteredPeople;
}
