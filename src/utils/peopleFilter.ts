import { Person } from '../types';

export const peopleFilter = (
  people: Person[],
  query: string | null,
  centuries: string[],
  sex: string | null,
) => {
  let filteredPeople = [...people];

  if (query) {
    filteredPeople = people.filter(
      (person) => person.name.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter((p) => {
      return centuries.includes(Math.ceil(p.born / 100).toString());
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter((person) => person.sex === sex);
  }

  return filteredPeople;
};
