import { Person } from '../types';

export function sortPeople(
  people: Person[],
  searchParams: URLSearchParams,
): Person[] {
  const sortParam = searchParams.get('sort') || '';
  const orderParam = searchParams.get('order') || '';

  switch (sortParam) {
    case 'name':
    case 'sex':
      if (orderParam === 'desc') {
        return people.toSorted((a, b) =>
          b[sortParam].localeCompare(a[sortParam]),
        );
      }

      return people.toSorted((a, b) =>
        a[sortParam].localeCompare(b[sortParam]),
      );
      break;

    case 'born':
    case 'died':
      if (orderParam === 'desc') {
        return people.toSorted((a, b) => b[sortParam] - a[sortParam]);
      }

      return people.toSorted((a, b) => a[sortParam] - b[sortParam]);
      break;

    default:
      return [...people];
      break;
  }
}

export function filterPeople(
  people: Person[],
  searchParams: URLSearchParams,
): Person[] {
  const centuryParam = searchParams.getAll('centuries') || [];
  const sexParam = searchParams.get('sex') || '';
  const queryParam = searchParams.get('query')?.toLowerCase() || '';

  let filteredPeople = [...people];

  if (sexParam !== '') {
    filteredPeople = filteredPeople.filter(person => person.sex === sexParam);
  }

  if (queryParam !== '') {
    filteredPeople = filteredPeople.filter(
      person =>
        person.name.toLowerCase().includes(queryParam) ||
        person.motherName?.toLowerCase().includes(queryParam) ||
        person.fatherName?.toLowerCase().includes(queryParam),
    );
  }

  if (centuryParam.length !== 0) {
    filteredPeople = filteredPeople.filter(person =>
      centuryParam.includes(`${Math.ceil(person.born / 100).toString()}`),
    );
  }

  return filteredPeople;
}
