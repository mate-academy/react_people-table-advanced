import { Person } from '../types';
import { FEMALE_SEX, MALE_SEX } from './constants';
import { getSortPeople } from './helpers';

export function filterBySex(person: Person, searchParams: URLSearchParams) {
  if (searchParams.toString().includes(MALE_SEX)) {
    return person.sex === MALE_SEX;
  }

  if (searchParams.toString().includes(FEMALE_SEX)) {
    return person.sex === FEMALE_SEX;
  }

  return true;
}

export function filterByCenturies(
  person: Person, centuries: string[],
): boolean {
  if (centuries.length !== 0) {
    return centuries.includes(Math.ceil(person.born / 100).toString());
  }

  return true;
}

export function filterByQuery(person: Person, query: string | null) {
  if (query !== null) {
    const queryLowerCase = query.toLowerCase();

    return (
      person.name.toLowerCase().includes(queryLowerCase)
      || (person.motherName
        && person.motherName.toLowerCase().includes(queryLowerCase))
      || (person.fatherName
        && person.fatherName.toLowerCase().includes(queryLowerCase))
    );
  }

  return true;
}

export function sortPeople(
  a: Person,
  b: Person,
  sort: string,
  order: string | null,
): number {
  if (sort === 'name') {
    return getSortPeople(a.name, b.name, order);
  }

  if (sort === 'sex') {
    return getSortPeople(a.sex, b.sex, order);
  }

  if (sort === 'born') {
    return getSortPeople(a.born, b.born, order);
  }

  if (sort === 'died') {
    return getSortPeople(a.died, b.died, order);
  }

  return 0;
}
