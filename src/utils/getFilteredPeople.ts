import { FilterType, Person } from '../types/types';

export const getFilteredPeople = (people: Person[], filters: FilterType) => {
  const { sex, name, centuries } = filters;

  return people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (
      name &&
      !person.name.toLowerCase().includes(name.toLowerCase()) &&
      !person.fatherName?.toLowerCase().includes(name.toLowerCase()) &&
      !person.motherName?.toLowerCase().includes(name.toLowerCase())
    ) {
      return false;
    }

    if (centuries.length) {
      if (!centuries.includes(`${Math.ceil(person.born / 100)}`)) {
        return false;
      }
    }

    return true;
  });
};
