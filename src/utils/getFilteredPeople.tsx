import { Person } from '../types';

type Filters = {
  sex: string | null;
  query: string;
  centuries: string[];
  sort: string | null;
  order: string | null;
};

export const getFilteredPeople = (
  people: Person[],
  { sex, query, centuries, sort, order }: Filters,
) => {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  const normalizeQuery = query.trim().toLowerCase();

  if (normalizeQuery) {
    filteredPeople = filteredPeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizeQuery) ||
        person.motherName?.toLowerCase().includes(normalizeQuery) ||
        person.fatherName?.toLowerCase().includes(normalizeQuery),
    );
  }

  if (centuries.length !== 0) {
    filteredPeople = filteredPeople.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  if (sort) {
    filteredPeople.sort((currentPerson, nextPerson) => {
      switch (sort) {
        case 'name':
          return order === 'desc'
            ? nextPerson.name.localeCompare(currentPerson.name)
            : currentPerson.name.localeCompare(nextPerson.name);
        case 'sex':
          return order === 'desc'
            ? nextPerson.sex.localeCompare(currentPerson.sex)
            : currentPerson.sex.localeCompare(nextPerson.sex);
        case 'born':
          return order === 'desc'
            ? nextPerson.born - currentPerson.born
            : currentPerson.born - nextPerson.born;
        case 'died':
          return order === 'desc'
            ? nextPerson.died - currentPerson.died
            : currentPerson.died - nextPerson.died;
        default:
          return 0;
      }
    });
  }

  return filteredPeople;
};
