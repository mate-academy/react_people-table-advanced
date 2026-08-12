import { Person } from '../types';

interface PeopleFilterOptions {
  query: string;
  centuries: string[];
  sex: string;
}

export const getPreparedPeople = (
  people: Person[],
  { query, centuries, sex }: PeopleFilterOptions,
) => {
  let preparedPeople = [...people];

  if (query) {
    const formattedQuery = query.toLowerCase();

    preparedPeople = preparedPeople.filter(
      person =>
        person.name.toLowerCase().includes(formattedQuery) ||
        person.motherName?.toLowerCase().includes(formattedQuery) ||
        person.fatherName?.toLowerCase().includes(formattedQuery),
    );
  }

  if (centuries.length !== 0) {
    const formattedCenturies = [...centuries].map(century => +century);

    preparedPeople = preparedPeople.filter(person =>
      formattedCenturies.includes(Math.ceil(person.born / 100)),
    );
  }

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  return preparedPeople;
};
