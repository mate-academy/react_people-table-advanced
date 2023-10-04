import { Person } from '../types';
import { SortFields } from '../types/SortFields';

export const getFilteredPeople = (
  people: Person[],
  queryParams: URLSearchParams,
): Person[] => {
  const query = queryParams.get('query') || '';
  const sexFilter = queryParams.get('sex');
  const centuriesFilter = queryParams.getAll('centuries');
  const sortField = queryParams.get('sort');
  const order = queryParams.get('order');

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
        .includes((Math.ceil(born / 100)).toString()));
  }

  if (sortField) {
    switch (sortField) {
      case SortFields.Name:
        filteredPeople
          .sort((personA, personB) => personA.name.localeCompare(personB.name));
        break;

      case SortFields.Sex:
        filteredPeople
          .sort((personA, personB) => personA.sex.localeCompare(personB.sex));
        break;

      case SortFields.Born:
        filteredPeople.sort((personA, personB) => personA.born - personB.born);
        break;

      case SortFields.Died:
        filteredPeople.sort((personA, personB) => personA.died - personB.died);
        break;

      default: break;
    }

    if (order) {
      filteredPeople.reverse();
    }
  }

  return filteredPeople;
};
