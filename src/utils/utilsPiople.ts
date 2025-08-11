import { Person } from '../types';
import { Filter } from '../types/Filter';

export function filterPeople(people: Person[], filter: Filter) {
  return people
    .filter(person => {
      if (filter.sex === '') {
        return true;
      }

      return person.sex === filter.sex;
    })
    .filter(
      person =>
        person.name.includes(filter.query) ||
        person.motherName?.includes(filter.query) ||
        person.fatherName?.includes(filter.query),
    )

    .filter(person => {
      const birthCentury = Math.ceil(person.born / 100);
      const deathCentury = Math.ceil(person.died / 100);

      if (filter.centuries.length === 0) {
        return true;
      }

      return (
        filter.centuries.includes(birthCentury.toString()) ||
        filter.centuries.includes(deathCentury.toString())
      );
    })
    .sort((a, b) => {
      const aValue = a[filter.sort];
      const bValue = b[filter.sort];

      if (aValue < bValue) {
        return filter.order === 'desc' ? 1 : -1;
      }

      if (aValue > bValue) {
        return filter.order === 'desc' ? -1 : 1;
      }

      return 0;
    });
}
