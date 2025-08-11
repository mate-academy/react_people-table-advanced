import { Person } from '../types';
import { SearchParams } from './searchHelper';

export const filterList = (people: Person[], filterParam: SearchParams) => {
  const { sex, query, century } = filterParam;
  let newPeople = [...people];

  if (sex) {
    newPeople = newPeople.filter(person => person.sex === sex);
  }

  if (query?.toString().trim()) {
    const queryNormalize = query.toString().toLowerCase();

    newPeople = newPeople.filter(
      person =>
        person.name.toLowerCase().includes(queryNormalize) ||
        person.fatherName?.toLowerCase().includes(queryNormalize) ||
        person.motherName?.toLowerCase().includes(queryNormalize),
    );
  }

  if (century?.length) {
    newPeople = newPeople.filter(person => {
      return century.includes(Math.ceil(person.born / 100).toString());
    });
  }

  return newPeople;
};

export const sortList = (
  filteredPeople: Person[],
  filterParam: SearchParams,
) => {
  const { sort, order } = filterParam;
  let sortedPeople = [...filteredPeople];

  if (sort) {
    switch (sort) {
      case 'name':
      case 'sex':
        sortedPeople = sortedPeople.sort((item1, item2) => {
          return item1[sort].localeCompare(item2[sort]);
        });
        break;
      case 'born':
      case 'died':
        sortedPeople = sortedPeople.sort((item1, item2) => {
          return +item1[sort] - +item2[sort];
        });
    }
  }

  if (order) {
    sortedPeople = sortedPeople.reverse();
  }

  return sortedPeople;
};
