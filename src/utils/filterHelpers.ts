import { Person } from '../types';
import { FilterBySex } from '../types/typesFilters/FilterBySex';
import { SortByPersonInfo } from '../types/typesSorts/SortByPersonInfo';

export const getFilterBySex = (type: string): FilterBySex => {
  switch (type) {
    case FilterBySex.MAN:
      return FilterBySex.MAN;

    case FilterBySex.WOMAN:
      return FilterBySex.WOMAN;

    default:
      return FilterBySex.ALL;
  }
};

export const checkStateCenturies = (
  ages: string[],
  value: string,
): string | string[] => {
  return ages.includes(value)
    ? ages.filter(century => century !== value)
    : [...ages, value];
};

export const getNormalizeString = (text: string): string => (
  text.toLocaleLowerCase()
);

export const getCentryByBorn = (year: number): number => {
  let century = Math.ceil(year / 100);

  if (year % 100 === 0) {
    century -= 1;
  }

  return century;
};

export const getVisiblePeople = (
  people: Person[],
  query: string | null,
  sex: FilterBySex,
  centuries: number[],
  sortType: SortByPersonInfo,
  order: string,
) => {
  let copyPeople = [...people];

  if (query) {
    copyPeople = copyPeople.filter(person => {
      const {
        name,
        motherName,
        fatherName,
      } = person;
      const normalizeQuery = getNormalizeString(query).trim();
      const normalizeName = getNormalizeString(name);
      const normalizeMotherName = getNormalizeString(motherName || '-');
      const normalizeFatherName = getNormalizeString(fatherName || '-');

      return normalizeName.includes(normalizeQuery)
        || normalizeMotherName.includes(normalizeQuery)
        || normalizeFatherName.includes(normalizeQuery);
    });
  }

  if (sex) {
    copyPeople = copyPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    copyPeople = copyPeople.filter(({ born }) => (
      centuries.includes(getCentryByBorn(born))
    ));
  }

  if (sortType) {
    copyPeople.sort((currentPerson, nextPerson) => {
      switch (sortType) {
        case SortByPersonInfo.NAME:
        case SortByPersonInfo.SEX:
          return currentPerson[sortType].localeCompare(nextPerson[sortType]);

        case SortByPersonInfo.BORN:
        case SortByPersonInfo.DIED:
          return currentPerson[sortType] - nextPerson[sortType];

        default:
          return 0;
      }
    });
  }

  if (order) {
    copyPeople.reverse();
  }

  return copyPeople;
};
