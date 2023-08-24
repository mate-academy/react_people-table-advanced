import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sort: string,
  order: string,
) => {
  const sortedPeople = people
    .filter(person => (
      !query || [person.name, person.fatherName, person.motherName]
        .some(name => (
          name?.toLowerCase().includes(query?.trim().toLowerCase())
        ))
    ))
    .filter(person => !sex || person.sex === sex)
    .filter(person => !centuries.length
      || centuries.includes(String(Math.ceil(person.born / 100))));

  if (sort) {
    sortedPeople.sort((a, b) => {
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
  }

  return order === 'desc'
    ? sortedPeople.reverse()
    : sortedPeople;
};
