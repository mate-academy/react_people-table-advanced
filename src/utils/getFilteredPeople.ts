import { Person } from '../types';

type Filters = {
  sex: string | null;
  query: string;
  centuries: string[];
  sort: string;
  order: string;
};

export const getFilteredPeople = (
  people: Person[],
  { sex, query, centuries, sort, order }: Filters,
) => {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    filteredPeople = filteredPeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length !== 0) {
    filteredPeople = filteredPeople.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  if (sort) {
    filteredPeople.sort((currPerson, nextPerson) => {
      switch (sort) {
        case 'name':
          return order === 'desc'
            ? nextPerson.name.localeCompare(currPerson.name)
            : currPerson.name.localeCompare(nextPerson.name);
        case 'sex':
          return order === 'desc'
            ? nextPerson.sex.localeCompare(currPerson.sex)
            : currPerson.sex.localeCompare(nextPerson.sex);
        case 'born':
          return order === 'desc'
            ? nextPerson.born - currPerson.born
            : currPerson.born - nextPerson.born;
        case 'died':
          return order === 'desc'
            ? nextPerson.died - currPerson.died
            : currPerson.died - nextPerson.died;

        default:
          return 0;
      }
    });
  }

  return filteredPeople;
};
