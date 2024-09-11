import { Person } from '../types';
import { CenturyFilter } from '../types/CenturyFilter';
import { PersonGenderFilter } from '../types/PersonGenderFilter';
import { SearchParamKeys } from '../types/SearchParamKeys';
import { SortType } from '../types/SortType';

export function getPreparedPeople(
  people: Person[],
  searchParams: URLSearchParams,
) {
  const sort = searchParams.get(SearchParamKeys.SORT) as SortType | null;
  const order = searchParams.get(SearchParamKeys.ORDER) as 'desc' | null;
  const query = searchParams.get(SearchParamKeys.QUERY) as string | null;
  const sex = searchParams.get(
    SearchParamKeys.SEX,
  ) as PersonGenderFilter | null;
  const centuries = searchParams.getAll(
    SearchParamKeys.CENTURIES,
  ) as CenturyFilter[];

  const preparedPeople = people.filter(person => {
    if (query) {
      const loweredQuery = query.toLowerCase();

      if (
        !person.name.toLowerCase().includes(loweredQuery) &&
        !person.motherName?.toLowerCase().includes(loweredQuery) &&
        !person.fatherName?.toLowerCase().includes(loweredQuery)
      ) {
        return false;
      }
    }

    if (sex && person.sex !== sex) {
      return false;
    }

    if (centuries.length) {
      if (
        !centuries.includes(
          String(Math.ceil(person.born / 100)) as CenturyFilter,
        )
      ) {
        return false;
      }
    }

    return true;
  });

  preparedPeople.sort((person1, person2) => {
    switch (sort) {
      case SortType.Name:
        return person1.name.localeCompare(person2.name);
      case SortType.Sex:
        return person1.sex.localeCompare(person2.sex);
      case SortType.Born:
        return person1.born - person2.born;
      case SortType.Died:
        return person1.died - person2.died;
      default:
        return 0;
    }
  });

  if (order) {
    preparedPeople.reverse();
  }

  return preparedPeople;
}
