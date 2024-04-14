import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[],
) => {
  let preparedPeople = [...people];
  const normalizedQuery = query?.toLowerCase().trim();

  if (sex === 'm') {
    preparedPeople = people.filter(person => person.sex === 'm');
  } else if (sex === 'f') {
    preparedPeople = people.filter(person => person.sex === 'f');
  }

  if (normalizedQuery) {
    preparedPeople = preparedPeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(person =>
      centuries.includes(person.century.toString()),
    );
  }

  return preparedPeople;
};
