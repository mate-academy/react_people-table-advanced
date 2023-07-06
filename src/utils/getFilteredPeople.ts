import { Person } from '../types';

export function getFilteredPeople(
  people: Person[],
  searchParams: URLSearchParams,
) {
  let filteredPeople = [...people];
  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase();
  const centuries = searchParams.getAll('centuries');

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query?.trim()) {
    filteredPeople = filteredPeople.filter(person => (
      person.name.toLowerCase().includes(query)
      || person.fatherName?.toLowerCase().includes(query)
      || person.motherName?.toLowerCase().includes(query)
    ));
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      const centuryBorn = `${Math.ceil(person.born / 100)}`;

      return centuries.includes(centuryBorn);
    });
  }

  return filteredPeople;
}
