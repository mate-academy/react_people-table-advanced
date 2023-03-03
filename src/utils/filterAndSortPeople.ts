import { Params } from '../types/Params';
import { Person } from '../types/Person';
import { filterPeopleByCenturies } from './filterPeopleByCenturies';
import { filterPeopleByQuery } from './filterPeopleByQuery';
import { filterPeopleBySex } from './filterPeopleBySex';
import { sortPeople } from './sortPeope';

export const filterAndSortPeople = (people: Person[], params: Params) => {
  let currentFilteredAndSortedPeople = [...people];

  if (params.sex) {
    currentFilteredAndSortedPeople = filterPeopleBySex(
      currentFilteredAndSortedPeople,
      params.sex,
    );
  }

  if (params.query) {
    currentFilteredAndSortedPeople = filterPeopleByQuery(
      currentFilteredAndSortedPeople,
      params.query,
    );
  }

  if (params.centuries.length) {
    currentFilteredAndSortedPeople = filterPeopleByCenturies(
      currentFilteredAndSortedPeople,
      params.centuries,
    );
  }

  if (params.sort) {
    currentFilteredAndSortedPeople = sortPeople(
      currentFilteredAndSortedPeople,
      params.sort,
      params.order,
    );
  }

  return currentFilteredAndSortedPeople;
};
