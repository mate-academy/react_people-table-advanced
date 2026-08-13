import { Person } from '../types';
import { SortFields } from '../types/SortFields';

interface PeoplePreparatorOptions {
  query: string;
  centuries: string[];
  sex: string;
  sort: SortFields | '';
  order: 'desc' | '';
}

export const CENTURIES = [16, 17, 18, 19, 20];

export const getPreparedPeople = (
  people: Person[],
  { query, centuries, sex, sort, order }: PeoplePreparatorOptions,
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

  if (sort) {
    preparedPeople.sort((personA, personB) => {
      const valA = personA[sort];
      const valB = personB[sort];

      let result = 0;

      if (typeof valA === 'number' && typeof valB === 'number') {
        result = valA - valB;
      } else if (typeof valA === 'string' && typeof valB === 'string') {
        result = valA.localeCompare(valB);
      }

      return order === 'desc' ? result * -1 : result;
    });
  }

  return preparedPeople;
};
