import { Person, SortType } from '../types';

export const filterPeople = (
  people: Person[],
  centuries: string[],
  query?: string,
  sex?: string,
) => {
  let filteredPeople = [...people];

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      return person.name.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => {
      return person.sex === sex;
    });
  }

  return filteredPeople;
};

export const sortPeople = (
  people: Person[],
  sortBy: SortType,
  isDesc: boolean,
) => {
  const sortedPeople = [...people];

  switch (sortBy) {
    case SortType.NAME:
    case SortType.SEX:
      return sortedPeople.sort((personA, personB) => {
        return isDesc ? -personA[sortBy].localeCompare(personB[sortBy])
          : personA[sortBy].localeCompare(personB[sortBy]);
      });
    case SortType.BORN:
    case SortType.DIED:
      return sortedPeople.sort((personA, personB) => {
        return isDesc ? -personA[sortBy] - personB[sortBy]
          : personA[sortBy] - personB[sortBy];
      });
    default:
      return sortedPeople;
  }
};
