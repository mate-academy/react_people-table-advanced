/* eslint-disable no-alert */
import { Person } from '../types';
import { calculateCentury } from './FilterCentury';

export const filtered = (
  query: string,
  sex: string,
  sortType: string,
  centuries: string[],
  order: string,
  array: Person[],
) => {
  let filteredArray = [...array];

  if (query) {
    const redactedQuery = query.toLowerCase();

    filteredArray = filteredArray.filter(
      ({ name, fatherName, motherName }) => (
        name.toLowerCase().includes(redactedQuery)
        || fatherName?.toLowerCase().includes(redactedQuery)
        || motherName?.toLowerCase().includes(redactedQuery)
      ),
    );
  }

  if (sex === 'm' || sex === 'f') {
    filteredArray = filteredArray.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    filteredArray = filteredArray.filter(person => centuries
      .includes(calculateCentury(person.born)));
  }

  if (sortType) {
    filteredArray = filteredArray.sort((a, b) => {
      switch (sortType) {
        case 'Name':
          return a.name.localeCompare(b.name);
        case 'Sex':
          return a.sex.localeCompare(b.sex);
        case 'Died':
        case 'Born':
          return a.born - b.born;
        default:
          throw new Error('wrong');
      }
    });

    return order === 'desc' ? filteredArray.reverse() : filteredArray;
  }

  return filteredArray;
};
