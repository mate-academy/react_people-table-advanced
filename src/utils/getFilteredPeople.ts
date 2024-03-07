import { Person } from '../types';
import { Filter } from '../types/filter';

export const getFilteredPeople = (filters: Filter, people: Person[]) => {
  const { sex, centuries, name } = filters;

  return people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (
      name &&
      !person.name.includes(name) &&
      !person.fatherName?.toLowerCase().includes(name) &&
      !person.motherName?.toLowerCase().includes(name)
    ) {
      return false;
    }

    if (centuries.length) {
      const bornCentury = Math.ceil(person.born / 100);

      if (!centuries.includes(`${bornCentury}`)) {
        return false;
      }
    }

    return true;
  });
};
