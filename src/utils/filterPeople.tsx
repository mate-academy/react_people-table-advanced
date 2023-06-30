import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  query: string | null,
  centuries: string[],
  sex: string | null,
) => {
  let filteredPeople = [...people];

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      const suitableNames = person.name + person.fatherName + person.motherName;

      return suitableNames.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase().trim());
    });
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(
      person => centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  return filteredPeople;
};
