import { Person } from '../types';

export const filterPeople = (
  currentParams: URLSearchParams,
  people: Person[],
): Person[] | [] => {
  const sex = currentParams.get('sex');
  const query = currentParams.get('query');
  const centuries = currentParams.getAll('centuries');

  return people.filter(person => {
    const matchesSex = !sex || person.sex === sex;
    const matchesQuery =
      !query ||
      person.name.includes(query?.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLowerCase());
    const matchesCenturies =
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(person.born / 100)));

    return matchesSex && matchesQuery && matchesCenturies;
  });
};
