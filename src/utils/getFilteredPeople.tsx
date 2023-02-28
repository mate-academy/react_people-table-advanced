import { Person } from '../types';

const getCentury = (year: number) => (
  Math.floor((year - 1) / 100) + 1
).toString();

export const getFilteredPeople = (
  people: Person[],
  query: string,
  sex: string | null,
  centuries: string[],
) => {
  let visiblePeople = people;

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      const { name, motherName, fatherName } = person;
      const lowerQuery = query.toLowerCase();

      return (
        name.toLowerCase().includes(lowerQuery)
        || motherName?.toLowerCase().includes(lowerQuery)
        || fatherName?.toLowerCase().includes(lowerQuery)
      );
    });
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    visiblePeople = visiblePeople
      .filter(person => centuries
        .includes(getCentury(person.born)));
  }

  return visiblePeople;
};
