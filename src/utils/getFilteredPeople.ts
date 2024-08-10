import { Person, Sex } from '../types';

export const getFilteredPeople = (
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
) => {
  let filteredPeople = [...people];

  if (sex && sex !== Sex.Both) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query.trim()) {
    const lowerQuery = query.toLocaleLowerCase();

    filteredPeople = filteredPeople.filter(
      person =>
        person.name.toLowerCase().includes(lowerQuery) ||
        person.motherName?.toLowerCase().includes(lowerQuery) ||
        person.fatherName?.toLowerCase().includes(lowerQuery),
    );
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person =>
      centuries.some(
        century =>
          Number(century) * 100 - 100 <= person.born &&
          person.born <= Number(century) * 100 - 1,
      ),
    );
  }

  return filteredPeople;
};
