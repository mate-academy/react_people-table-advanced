/* eslint-disable operator-linebreak */
import { Person } from '../types';

export enum SortField {
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
}

export function getPeoplePrepeared(
  people: Person[],
  query: string,
  selectedSex: string,
  centuries: string[],
  sortField: SortField | null,
  sortOrder: string,
): Person[] {
  let prepearedPeople = [...people];

  if (query) {
    const prepearedQuery = query.toLowerCase().trim();

    prepearedPeople = prepearedPeople.filter(person => {
      return (
        person.name.toLowerCase().includes(prepearedQuery) ||
        person.motherName?.toLowerCase().includes(prepearedQuery) ||
        person.fatherName?.toLowerCase().includes(prepearedQuery)
      );
    });
  }

  if (selectedSex) {
    prepearedPeople = prepearedPeople.filter(person => {
      return person.sex === selectedSex;
    });
  }

  if (centuries.length) {
    prepearedPeople = prepearedPeople.filter(person => {
      const bornInCent = Math.ceil(person.born / 100);
      const diedInCent = Math.ceil(person.died / 100);

      return (
        centuries.includes(`${bornInCent}`) ||
        centuries.includes(`${diedInCent}`)
      );
    });
  }

  if (sortField) {
    prepearedPeople = prepearedPeople.sort((current, next) => {
      switch (sortField) {
        case SortField.NAME:
        case SortField.SEX:
          return current[sortField].localeCompare(next[sortField]);
        case SortField.BORN:
        case SortField.DIED:
          return +current[sortField] - +next[sortField];
        default:
          return 0;
      }
    });
  }

  if (sortOrder) {
    prepearedPeople = prepearedPeople.reverse();
  }

  return prepearedPeople;
}
