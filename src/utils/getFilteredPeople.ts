import { Person } from '../types';
import { Filter } from '../types/Filter';

export const getFilteredPeople = (
  people: Person[],
  filters: Filter,
): Person[] => {
  const { sex, name, centuries } = filters;

  return people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (name) {
      const personName = person.name.toLowerCase();
      const motherName = person.motherName?.toLowerCase();
      const fatherName = person.fatherName?.toLocaleLowerCase();

      if (
        !personName.includes(name) &&
        !motherName?.includes(name) &&
        !fatherName?.includes(name)
      ) {
        return false;
      }
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
