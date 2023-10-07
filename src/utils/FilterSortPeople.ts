import { Person } from '../types';
import { QueryParamsType } from '../types/QueryParamsType';
import { SortFields } from '../types/SortFields';
import { CENTURY_DIVIDER } from './variables';

export const FilterSortPeople = (
  people: Person[],
  queryParams: URLSearchParams,
): Person[] => {
  const query = queryParams.get(QueryParamsType.Query) || '';
  const sexFilter = queryParams.get(QueryParamsType.Sex);
  const centuriesFilter = queryParams.getAll(QueryParamsType.Centuries);
  const sortField = queryParams.get(QueryParamsType.Sort);
  const order = queryParams.get(QueryParamsType.Order);

  let filteredPeople = [...people];

  if (query) {
    filteredPeople = filteredPeople
      .filter(({ name, motherName, fatherName }) => {
        const currentQuery = query.toLowerCase();

        return (name.toLowerCase().includes(currentQuery)
        || motherName?.toLowerCase().includes(currentQuery)
        || fatherName?.toLowerCase().includes(currentQuery));
      });
  }

  if (sexFilter) {
    filteredPeople = filteredPeople
      .filter(({ sex }) => sex === sexFilter);
  }

  if (centuriesFilter.length) {
    filteredPeople = filteredPeople
      .filter(({ born }) => centuriesFilter
        .includes((Math.ceil(born / CENTURY_DIVIDER)).toString()));
  }

  if (sortField) {
    switch (sortField) {
      case SortFields.Name:
        filteredPeople
          .sort((a, b) => a.name.localeCompare(b.name));
        break;

      case SortFields.Sex:
        filteredPeople
          .sort((a, b) => a.sex.localeCompare(b.sex));
        break;

      case SortFields.Born:
        filteredPeople.sort((a, b) => a.born - b.born);
        break;

      case SortFields.Died:
        filteredPeople.sort((a, b) => a.died - b.died);
        break;

      default: break;
    }

    if (order) {
      filteredPeople.reverse();
    }
  }

  return filteredPeople;
};
