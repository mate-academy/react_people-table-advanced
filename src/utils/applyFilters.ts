import { Person } from '../types/Person';
import { Filters } from '../types/Filters';

export function applyFilters(people: Person[], filters: Filters): Person[] {
  let result = [...people];

  if (filters.sex) {
    result = result.filter(person => person.sex === filters.sex);
  }

  if (filters.query) {
    const query = filters.query.toLowerCase();

    result = result.filter(
      person =>
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query),
    );
  }

  if (filters.centuries && filters.centuries.length > 0) {
    result = result.filter(person => {
      const century = Math.ceil(person.born / 100);

      return filters.centuries!.includes(String(century));
    });
  }

  return result;
}

export function applySorting(people: Person[], filters: Filters): Person[] {
  const { sort, order } = filters;

  if (!sort) {
    return people;
  }

  const sorted = [...people];

  sorted.sort((personOne, personTwo) => {
    let personOneValue: string | number = '';
    let personTwoValue: string | number = '';

    switch (sort) {
      case 'name':
        personOneValue = personOne.name;
        personTwoValue = personTwo.name;
        break;
      case 'sex':
        personOneValue = personOne.sex;
        personTwoValue = personTwo.sex;
        break;
      case 'born':
        personOneValue = personOne.born;
        personTwoValue = personTwo.born;
        break;
      case 'died':
        personOneValue = personOne.died;
        personTwoValue = personTwo.died;
        break;
    }

    if (
      typeof personOneValue === 'string' &&
      typeof personTwoValue === 'string'
    ) {
      return order === 'desc'
        ? personTwoValue.localeCompare(personOneValue)
        : personOneValue.localeCompare(personTwoValue);
    }

    if (
      typeof personOneValue === 'number' &&
      typeof personTwoValue === 'number'
    ) {
      return order === 'desc'
        ? personTwoValue - personOneValue
        : personOneValue - personTwoValue;
    }

    return 0;
  });

  return sorted;
}
