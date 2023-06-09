import { Person } from '../types';

export const filtersPeople = (
  people: Person[],
  query: string | null,
  centuries: string[],
  sex: string | null,
) => {
  let filteredPeople = [...people];

  if (query) {
    filteredPeople = filteredPeople
      .filter(person => {
        const names = person.name + person.motherName + person.fatherName;

        return names
          .toLocaleLowerCase().includes(query
            .toLocaleLowerCase().trim());
      });
  }

  if (sex) {
    filteredPeople = filteredPeople
      .filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople
      .filter(person => {
        return centuries.includes(Math.ceil(person.born / 100).toString());
      });
  }

  return filteredPeople;
};
