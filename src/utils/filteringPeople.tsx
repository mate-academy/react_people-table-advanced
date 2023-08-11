import { Person } from '../types';

export const filteringPeople = (
  people: Person[],
  query: string | null,
  centuries: string[],
  gender: string | null,
) => {
  let copyPeople = [...people];

  if (query) {
    copyPeople = people.filter(
      (person) => person.name.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (centuries.length > 0) {
    copyPeople = copyPeople.filter((p) => {
      return centuries.includes(Math.ceil(p.born / 100).toString());
    });
  }

  if (gender) {
    copyPeople = copyPeople.filter((person) => person.sex === gender);
  }

  return copyPeople;
};
