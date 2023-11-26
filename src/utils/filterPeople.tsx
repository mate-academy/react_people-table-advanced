import { Person } from '../types';

interface Filters {
  centuries: string[] | null;
  sex: string | null;
  query: string | null;
}

export function filterPeople(people: Person[], filters: Filters) {
  let peopleCopy = [...people];

  const normalizeQuery = () => filters.query?.toLowerCase().trim() as string;

  const filterByCenturies = (person: Person) => (
    filters.centuries?.includes(Math.ceil(person.born / 100).toString())
  );

  const filterBySex = (person: Person) => (
    person.sex === filters.sex
  );

  const filterByQuery = (person: Person) => (
    person.name.toLowerCase().includes(normalizeQuery())
    || (person.fatherName?.toLowerCase().includes(normalizeQuery())
    || person.motherName?.toLowerCase().includes(normalizeQuery()))
  );

  if (filters.centuries?.length !== 0) {
    peopleCopy = peopleCopy.filter(filterByCenturies);
  }

  if (filters.sex) {
    peopleCopy = peopleCopy.filter(filterBySex);
  }

  if (filters.query) {
    peopleCopy = peopleCopy.filter(filterByQuery);
  }

  return peopleCopy;
}
