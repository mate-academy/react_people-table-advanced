import { Person } from '../types';
// import { SortParams } from '../components/PeopleTable';

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
          return person1.name.localeCompare(person2.name);

        case 'sex':
          return person1.sex.localeCompare(person2.sex);

        case 'born':
          return person1.born - person2.born;

        case 'died':
          return person1.died - person2.died;

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
