import { Person } from '../types';

export const filterBy = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[] | null,
) => {
  let filteredPeople = [...people];
  const normalizedQuery = query?.toLowerCase();

  if (sex === 'm') {
    filteredPeople = people.filter(person => person.sex === 'm');
  } else if (sex === 'f') {
    filteredPeople = people.filter(person => person.sex === 'f');
  }

  if (normalizedQuery) {
    filteredPeople = filteredPeople.filter(person => {
      return (
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery)
      );
    });
  }

  if (centuries?.length) {
    filteredPeople = filteredPeople.filter(person => {
      const centuryValue = String(Math.ceil(person.born / 100));

      return centuries.includes(centuryValue);
    });
  }

  return filteredPeople;
};
