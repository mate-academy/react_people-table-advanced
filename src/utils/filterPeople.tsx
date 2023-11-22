import { Person } from '../types';

interface Filters {
  centuries: string[] | null,
  sex: string | null,
  query: string | null,
}

export function filterPeople(people: Person[], filters: Filters) {
  let peopleCopy = [...people];

  if (filters.centuries?.length !== 0) {
    peopleCopy = peopleCopy.filter((person: Person) => (
      filters.centuries?.includes(Math.ceil(person.born / 100).toString())
    ));
  }

  if (filters.sex) {
    peopleCopy = peopleCopy.filter((person: Person) => (
      person.sex === filters.sex
    ));
  }

  if (filters.query) {
    peopleCopy = peopleCopy.filter((person: Person) => (
      person.name.toLowerCase().includes(
        filters.query?.toLowerCase().trim() as string,
      )
      || person.fatherName?.toLowerCase().includes(
        filters.query?.toLowerCase().trim() as string,
      )
      || person.motherName?.toLowerCase().includes(
        filters.query?.toLowerCase().trim() as string,
      )
    ));
  }

  return peopleCopy;
}
