/* eslint-disable */
import { Person } from '../types';
import { Filters } from '../types/Filters';

const getCentury = (year: number) => {
  return Math.ceil(year / 100);
};

export const filterPeople = (people: Person[], filters: Filters) => {
  const { sex, query, centuries, sort, order } = filters;

  let filteredPeople = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (
      query &&
      !person.name.toLowerCase().includes(query.toLowerCase()) &&
      !person.fatherName?.toLowerCase().includes(query.toLowerCase()) &&
      !person.motherName?.toLowerCase().includes(query.toLowerCase())
    ) {
      return false;
    }

    const personCentury = getCentury(person.born);

    if (
      centuries &&
      centuries.length > 0 &&
      !centuries.includes(String(personCentury))
    ) {
      return false;
    }

    return true;
  });

  if (sort) {
    filteredPeople = filteredPeople.sort((a, b) => {
      if (a[sort] < b[sort]) {
        return order === 'asc' ? -1 : 1;
      }

      if (a[sort] > b[sort]) {
        return order === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  return filteredPeople;
};
