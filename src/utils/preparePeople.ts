import { Person } from '../types';

export function preparePeople(
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sort: string,
) {
  let preparedPeople = [...people];

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normilezedQuery = query.toLowerCase().trim();

    preparedPeople = preparedPeople
      .filter(({ name, fatherName, motherName }) => (
        name.toLowerCase().includes(normilezedQuery)
        || fatherName?.toLowerCase().includes(normilezedQuery)
        || motherName?.toLowerCase().includes(normilezedQuery)
      ));
  }

  if (centuries.length > 0) {
    preparedPeople = preparedPeople
      .filter(person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ));
  }

  if (sort) {
    
  }

  return preparedPeople;
}
