import { Person } from '../types';

export const getPreparedPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[],
  sort: string,
  order: string,
) => {
  const preparedPeople = people
    .filter(person => !query
      || [person.name, person.fatherName, person.motherName]
        .some(name => name?.toLowerCase().includes(query.trim().toLowerCase())))
    .filter(person => !sex
      || person.sex === sex)
    .filter(person => !centuries.length
      || centuries.includes(String(Math.ceil(person.born / 100))));

  if (sort) {
    preparedPeople
      .sort((a, b) => {
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

  return order === 'desc' ? preparedPeople.reverse() : preparedPeople;
};
