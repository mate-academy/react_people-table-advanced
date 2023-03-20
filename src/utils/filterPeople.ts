import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
) => {
  let newPeople = [...people];

  if (sex) {
    newPeople = newPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    const getCentury = (person: Person) => Math.ceil(person.born / 100);

    newPeople = newPeople
      .filter(person => centuries
        .includes(getCentury(person).toString()));
  }

  if (query) {
    newPeople = newPeople.filter(person => {
      const checkingString = (
        person.name + person.motherName + person.fatherName
      ).toLocaleLowerCase();

      return checkingString.includes(query.toLocaleLowerCase());
    });
  }

  return newPeople;
};
