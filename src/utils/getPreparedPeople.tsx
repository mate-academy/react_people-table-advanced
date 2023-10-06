import { getSortPreparedPeople } from './getSortedPeople';
import { Person } from '../types';
import { CENTURY_DIVIDER } from './variablesHelpers';

export const getPreparedPeople = (
  people: Person[],
  query: string,
  sexParam: string,
  centuries: string[],
  sort: string,
  order: string,
) => {
  const preparedPeople = people.filter(({
    name,
    motherName,
    fatherName,
    sex,
    born,
  }) => {
    let condition = true;

    if (query) {
      const preparedQuery = query.toLowerCase();

      condition = name.toLowerCase().includes(preparedQuery)
        || (motherName?.toLowerCase().includes(preparedQuery) || false)
        || (fatherName?.toLowerCase().includes(preparedQuery) || false);
    }

    if (sexParam) {
      condition = condition && sex === sexParam;
    }

    if (centuries.length) {
      condition = condition
        && centuries.includes(`${Math.ceil(born / CENTURY_DIVIDER)}`);
    }

    return condition;
  });

  return getSortPreparedPeople(preparedPeople, sort, order);
};
