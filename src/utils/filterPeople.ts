import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[],
  sort: string,
  order: string,
) => {
  let allPeople = [...people];

  if (query) {
    allPeople = allPeople.filter((person: Person) => {
      if (person.name.toLowerCase().includes(query.toLowerCase())
      || person.fatherName?.toLowerCase().includes(query.toLowerCase())
      || person.motherName?.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }

      return false;
    });
  }

  if (sex) {
    allPeople = allPeople.filter((person: Person) => person.sex === sex);
  }

  if (centuries.length > 0) {
    allPeople = allPeople.filter((person) => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });
  }

  if (sort) {
    allPeople.sort((a: Person, b: Person) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return order !== 'desc'
            ? a[sort].localeCompare(b[sort])
            : b[sort].localeCompare(a[sort]);

        case 'born':
        case 'died':
          return order !== 'desc'
            ? a[sort] - b[sort]
            : b[sort] - a[sort];

        default:
          return 0;
      }
    });
  }

  return allPeople;
};
