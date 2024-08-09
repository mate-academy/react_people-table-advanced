import { Person } from '../types';
import { Sort } from '../types/Sort';

export function filterBySex(people: Person[], sex: string | null): Person[] {
  return sex ? people.filter(person => person.sex === sex) : people;
}

export function filterByQuery(
  people: Person[],
  query: string | null,
): Person[] {
  if (!query) return people;

  const lowercasedQuery = query.toLowerCase();
  return people.filter(
    person =>
      person.name.toLowerCase().includes(lowercasedQuery) ||
      person.motherName?.toLowerCase().includes(lowercasedQuery) ||
      person.fatherName?.toLowerCase().includes(lowercasedQuery),
  );
}

export function filterByCenturies(
  people: Person[],
  centuries: string[],
): Person[] {
  if (centuries.length === 0) return people;

  return people.filter(person => {
    const personCentury = Math.ceil(+person.born / 100);
    return centuries.includes(`${personCentury}`);
  });
}

export function sortPeople(
  people: Person[],
  sortField: keyof Person | null,
  order: boolean,
): Person[] {
  if (!sortField) return people;

  const sortedPeople = [...people].sort((person1, person2) => {
    const value1 = person1[sortField];
    const value2 = person2[sortField];

    switch (sortField) {
      case Sort.Name:
      case Sort.Sex:
        return (value1 as string).localeCompare(value2 as string);
      case Sort.Born:
      case Sort.Died:
        return (Number(value1) || 0) - (Number(value2) || 0);
      default:
        return 0;
    }
  });

  return order ? sortedPeople.reverse() : sortedPeople;
}
