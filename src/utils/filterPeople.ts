import { Person } from '../types';
import { FilterField } from '../types/filterField';

export const filterPeople = (
  people: Person[],
  field: FilterField,
  value: string | string[],
) => {
  if (typeof value === 'string') {
    switch (field) {
      case 'query':
        return [...people].filter(
          person =>
            person.name.toLowerCase().includes(value) ||
            person.motherName?.toLowerCase().includes(value) ||
            person.fatherName?.toLowerCase().includes(value),
        );
      case 'sex':
        return [...people].filter(person => person.sex === value);

      default:
        return [...people];
    }
  } else {
    return [...people].filter(person => {
      const personBirthCentury = Math.ceil(person.born / 100);

      return value.includes(personBirthCentury.toString());
    });
  }
};
