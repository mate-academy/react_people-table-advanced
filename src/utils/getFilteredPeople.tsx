import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[],
) => {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    const isContainQuery = (person: string | null) => {
      return person
        ? person.toLowerCase().includes(query.toLowerCase())
        : null;
    };

    filteredPeople = filteredPeople.filter(person => (
      isContainQuery(person.name)
        || isContainQuery(person.fatherName)
        || isContainQuery(person.motherName)
    ));
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      const personBornCentury = Math.ceil(person.born / 100).toString();

      return centuries.includes(personBornCentury);
    });
  }

  return filteredPeople;
};
