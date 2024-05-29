import { Person } from '../types';

type FilterParams = {
  sex: string;
  query: string;
  centuries: string[];
};

export function filterPeople(
  people: Person[],
  { sex, query, centuries }: FilterParams,
): Person[] {
  return people?.filter(person => {
    const matchesSex = sex === 'All' || person.sex === sex;
    const matchesQuery =
      query === '' || person.name.toLowerCase().includes(query.toLowerCase());

    const matchesCentury =
      centuries.length === 0 ||
      centuries.some(century => {
        const bornCentury = Math.ceil(person.born / 100).toString();

        return century === bornCentury;
      });

    return matchesSex && matchesQuery && matchesCentury;
  });
}
