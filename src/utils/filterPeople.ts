import { Person } from '../types';

interface Filters {
  sex: string | null;
  query: string | null;
  centuries?: string[];
}

export const filterPeople = (
  people: Person[],
  { centuries, query, sex }: Filters,
) =>
  people.filter(person => {
    const matchesSex = !sex || person.sex === sex;

    const matchesQuery =
      !query || person.name.toLowerCase().includes(query.toLowerCase());

    const matchesCenturies =
      !centuries?.length ||
      centuries.includes(Math.ceil(person.born / 100).toString());

    return matchesSex && matchesQuery && matchesCenturies;
  });
