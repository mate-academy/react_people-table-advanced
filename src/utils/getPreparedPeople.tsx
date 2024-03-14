import { Person } from '../types';

type SortParams = {
  sortField: string | null;
  descending: string | null;
};

type FilterParams = {
  filterField: string | null;
  centuries: string[] | null;
  query: string | null;
};

function getCentury(person: Person) {
  return Math.ceil(person.born / 100).toString();
}

export function getPreparedPeople(
  people: Person[],
  sortParams: SortParams,
  filterParams: FilterParams,
) {
  const { sortField, descending } = sortParams;
  const { filterField, centuries, query } = filterParams;

  let preparedPeople = filterField
    ? [...people].filter(person => person.sex === filterField)
    : [...people];

  if (sortField) {
    preparedPeople.sort((person1, person2) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return person1[sortField].localeCompare(person2[sortField]);

        case 'born':
        case 'died':
          return person1[sortField] - person2[sortField];

        default:
          return 0;
      }
    });
  }

  if (descending) {
    preparedPeople.reverse();
  }

  if (centuries?.length) {
    preparedPeople = preparedPeople.filter(person =>
      centuries.includes(getCentury(person)),
    );
  }

  if (query) {
    preparedPeople = preparedPeople.filter(person =>
      person.name.toLowerCase().includes(query),
    );
  }

  return preparedPeople;
}
