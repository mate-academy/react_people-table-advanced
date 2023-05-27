import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
): Person[] => {
  let prepearedPeople = [...people];

  if (sex) {
    prepearedPeople = prepearedPeople.filter(person => person.sex === sex);
  }

  if (query) {
    prepearedPeople = prepearedPeople.filter(person => {
      const names = person.name + person.fatherName + person.motherName;

      return names.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (centuries.length > 0) {
    prepearedPeople = prepearedPeople.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  return prepearedPeople;
};
