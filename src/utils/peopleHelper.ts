import { Person } from '../types/Person';

export type SortField = 'name' | 'sex' | 'born' | 'died';

export function filterPeople(people: Person[], searchParams: URLSearchParams) {
  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  return people.filter(person => {
    const matchesQuery =
      query.length === 0 ||
      [person.name, person.motherName, person.fatherName]
        .filter(Boolean)
        .some(value => value?.toLowerCase().includes(query));

    const matchesSex = sex ? person.sex === sex : true;

    const matchesCenturies =
      centuries.length === 0 ||
      centuries.some(century => {
        const bornCentury = Math.floor(person.born / 100) + 1;

        return String(bornCentury) === century;
      });

    return matchesQuery && matchesSex && matchesCenturies;
  });
}

export function sortPeople(
  people: Person[],
  sort: SortField | null,
  order: 'asc' | 'desc' | null,
) {
  if (!sort) {
    return [...people];
  }

  const sorted = [...people].sort((leftPerson, rightPerson) => {
    const leftValue = leftPerson[sort];
    const rightValue = rightPerson[sort];

    if (typeof leftValue === 'number' && typeof rightValue === 'number') {
      return leftValue - rightValue;
    }

    return String(leftValue).localeCompare(String(rightValue));
  });

  return order === 'desc' ? sorted.reverse() : sorted;
}
