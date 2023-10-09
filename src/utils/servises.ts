import { Person } from '../types';
import { PeopleSortType } from './PeopleSortType';
import { FEMALE_SEX, MALE_SEX, ONE_CENTURY } from './variables';

export const getPreparedPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
  sort: string,
  order: string,
): Person[] => {
  let preparedPeople = [...people];

  if (sort) {
    switch (sort) {
      case PeopleSortType.Name:
      case PeopleSortType.Sex:
        preparedPeople = preparedPeople
          .sort((a, b) => a[sort].localeCompare(b[sort]));
        break;
      case PeopleSortType.Born:
      case PeopleSortType.Died:
        preparedPeople = preparedPeople
          .sort((a, b) => a[sort] - b[sort]);
        break;
      default:
        return preparedPeople;
    }
  }

  if (order) {
    preparedPeople = preparedPeople.reverse();
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(person => {
      const getCentury = Math.ceil(person.born / ONE_CENTURY);

      return centuries.includes(`${getCentury}`);
    });
  }

  if (query) {
    preparedPeople = preparedPeople.filter(person => {
      const preparedQuery = query.trim().toLowerCase();
      const preparedName = person.name.trim()
        .toLowerCase()
        .includes(preparedQuery);

      const preparedMotherName = person.motherName
        ?.toLowerCase()
        .includes(preparedQuery);
      const preparedFatherName = person.fatherName
        ?.toLowerCase()
        .includes(preparedQuery);

      return preparedName || preparedMotherName || preparedFatherName;
    });
  }

  if (sex) {
    preparedPeople = preparedPeople.filter(person => {
      switch (sex) {
        case FEMALE_SEX:
          return person.sex === FEMALE_SEX;
        case MALE_SEX:
          return person.sex === MALE_SEX;
        default:
          return person;
      }
    });
  }

  return preparedPeople;
};
