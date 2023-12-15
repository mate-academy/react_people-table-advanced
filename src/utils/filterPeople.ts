import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[],
) => {
  let copyPeople = [...people];

  if (sex) {
    copyPeople = copyPeople.filter(person => person.sex === sex);
  }

  if (query) {
    copyPeople = copyPeople.filter(person => {
      const stringToCheck = (
        person.name + person.fatherName + person.motherName).toLowerCase();

      return stringToCheck.includes(query.toLowerCase());
    });
  }

  if (centuries.length) {
    const getCentery = (born: number) => Math.ceil(born / 100);

    copyPeople = copyPeople.filter(person => centuries
      .includes(getCentery(person.born).toString()));
  }

  return copyPeople;
};
