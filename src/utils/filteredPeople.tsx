import { Filter, Person } from '../types';

export const getFilteredPeople = (people: Person[], filters: Filter) => {
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
