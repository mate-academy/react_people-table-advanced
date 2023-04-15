import { Person } from '../types';

export const peopleFilterFunction = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query')?.toLowerCase() || null;
  const centuries = searchParams.get('centuries') || null;

  let newPeople = [...people];

  if (sex) {
    newPeople = newPeople.filter((person) => person.sex === sex);
  }

  if (query) {
    newPeople = newPeople.filter(
      (person) => person.name.toLowerCase().includes(query)
        || person.motherName?.toLowerCase().includes(query)
        || person.fatherName?.toLowerCase().includes(query),
    );
  }

  if (centuries) {
    newPeople = newPeople.filter(
      (person) => centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  return newPeople;
};
