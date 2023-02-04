import { Person } from '../types';

interface FilterFields {
  people: Person[],
  sex: string | null,
  query: string | null,
  century: string[],
  sort: string | null,
  order: string | null,
}

export const getVisiblePeople = (fields: FilterFields) => {
  const {
    people,
    sex,
    query,
    century,
    sort,
    order,
  } = fields;

  const filteredPeople = people.filter(person => {
    const queryLowerCase = query?.toLowerCase();
    const queryFiltered = queryLowerCase
      ? (person.name || person.motherName || person.fatherName)?.toLowerCase()
        .includes(queryLowerCase)
      : true;

    const centuryFiltered = century.length
      ? century.includes(Math.ceil(person.born / 100).toString())
      : true;

    const sexFiltered = sex
      ? person.sex === sex
      : true;

    return queryFiltered && centuryFiltered && sexFiltered;
  });

  const sortedPeople = sort === null
    ? filteredPeople
    : filteredPeople.sort((a, b): number => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);

        case 'born':
        case 'died':
          return a[sort] - b[sort];

        default:
          return 0;
      }
    });

  if (order) {
    sortedPeople.reverse();
  }

  return sortedPeople;
};
