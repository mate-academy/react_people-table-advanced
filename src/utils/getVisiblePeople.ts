import { Person } from '../types';
import { sortPeople } from './sortPeople';

interface Params {
  sex: string,
  query: string,
  centuries: string[],
  sort: string,
  order: string,
}

export const getVisiblePeople = (
  people: Person[],
  params: Params,
) => {
  const {
    sex,
    query,
    centuries,
    sort,
    order,
  } = params;

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      const { name, fatherName, motherName } = person;
      const lowerCaseQuery = (name + fatherName + motherName).toLowerCase();

      return lowerCaseQuery.includes(query.toLowerCase());
    });
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  if (sort) {
    visiblePeople = sortPeople(sort, visiblePeople);
  }

  if (order) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
