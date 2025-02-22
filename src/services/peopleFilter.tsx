import { Person } from '../types';
import { CenturyForSearch } from '../types/CenturyForSearch';
import { PersonSex } from '../types/personSex';
import { SearchParams } from '../types/SearchParams';
import { SortType } from '../types/sortType';

export const peopleFilter = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const preparedPeople = [...people];

  const query = searchParams.get(SearchParams.QUERY) || '';
  const sex = searchParams.get(SearchParams.SEX) || PersonSex.ALL;
  const centuries = searchParams.getAll(SearchParams.CENTURIES) || [];
  const order = searchParams.get(SearchParams.ORDER) || null;
  const sort = searchParams.get(SearchParams.SORT) as SortType | null;

  const filtered = preparedPeople.filter(person => {
    if (query.length > 0) {
      const lowerQuery = query.toLowerCase().trim();

      if (
        !person.name.toLowerCase().includes(lowerQuery) &&
        !person.motherName?.toLowerCase().includes(lowerQuery) &&
        !person.fatherName?.toLowerCase().includes(lowerQuery)
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
          String(Math.ceil(person.born / 100)) as CenturyForSearch,
        )
      ) {
        return false;
      }
    }

    return true;
  });

  filtered.sort((a, b) => {
    switch (sort) {
      case SortType.Born:
        return a.born - b.born;
      case SortType.Died:
        return a.died - b.died;
      case SortType.Name:
        return a.name.localeCompare(b.name);
      case SortType.Sex:
        return a.sex.localeCompare(b.sex);
      default:
        return 0;
    }
  });

  if (order) {
    filtered.reverse();
  }

  return filtered;
};
