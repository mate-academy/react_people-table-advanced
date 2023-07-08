import { Person } from '../types';

interface Params {
  sex: string | null,
  query: string | null,
  centuries: string[],
}

export function getFilteredPeople(
  people: Person[],
  params: Params,
) {
  let filteredPeople = [...people];
  const { sex, query, centuries } = params;

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
