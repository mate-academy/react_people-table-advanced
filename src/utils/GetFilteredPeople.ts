import { Person } from '../types';

interface FilterOptions {
  query: string | null;
  sex: string | null;
  centuries: string[] | null;
}

interface SortOptions {
  sort: string | null;
  order: string | null;
}

function getSortedPeople(people: Person[], sortOptions: SortOptions) {
  const { sort, order } = sortOptions;

  const sorted = [...people].sort((p1, p2) => {
    switch (sort) {
      case 'name':
        return p1.name.localeCompare(p2.name);
      case 'sex':
        return p1.sex.localeCompare(p2.sex);
      case 'born':
        return p1.born - p2.born;
      case 'died':
        return p1.died - p2.died;
      default:
        return 0;
    }
  });

  if (order) {
    sorted.reverse();
  }

  return sorted;
}

export function getFilteredPeople(
  people: Person[],
  filterOptions: FilterOptions,
  sortOptions: SortOptions,
) {
  const { query, sex, centuries } = filterOptions;
  const preparedQuery = query?.trim().toLowerCase() || '';

  const filteredPeople = people.filter(person => {
    const { name, father, mother, century } = person;

    const isName = name.trim().toLowerCase().includes(preparedQuery);
    const isFather = father?.name.trim().toLowerCase().includes(preparedQuery);
    const isMother = mother?.name.trim().toLowerCase().includes(preparedQuery);

    const isNameIncludesQuery = isName || isFather || isMother;

    const isCenturies = centuries?.length ? centuries.includes(century!) : true;

    const isSex = sex ? sex === person.sex : true;

    return isNameIncludesQuery && isCenturies && isSex;
  });

  return getSortedPeople(filteredPeople, sortOptions);
}
