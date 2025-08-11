import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const lowerQuery = query.toLowerCase();

  const filteredPeople = people.filter(person => {
    const matchesQuery =
      !lowerQuery ||
      person.name.toLowerCase().includes(lowerQuery) ||
      person.fatherName?.toLowerCase().includes(lowerQuery) ||
      person.motherName?.toLowerCase().includes(lowerQuery);
    const matchesSex = !sex || person.sex === sex;
    const matchesCentury =
      !centuries.length ||
      centuries.includes((Math.floor(person.born / 100) + 1).toString());

    return matchesQuery && matchesSex && matchesCentury;
  });

  return filteredPeople;
};
