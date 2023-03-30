import { Person } from '../types';

export function filterPeople(
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
) {
  let filteredPeople = people;

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      const regExp = new RegExp(query, 'gi');

      return regExp.test(person.name)
        || regExp.test(person.fatherName || '')
        || regExp.test(person.motherName || '');
    });
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(`${century}`);
    });
  }

  return filteredPeople;
}
