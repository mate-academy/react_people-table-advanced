import { Person } from '../types';

export interface Filter {
  sex: string | null;
  name: string | null;
  centuries: string[];
}

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
      const fatherName = person.fatherName?.toLowerCase();

      if (
        !personName.includes(name) &&
        !motherName?.includes(name) &&
        !fatherName?.includes(name)
      ) {
        return false;
      }
    }

    if (centuries.length) {
      const personCentury = Math.ceil(person.born / 100);

      if (!centuries.includes(`${personCentury}`)) {
        return false;
      }
    }

    return true;
  });
};
