import { Person } from '../types';

export function sortPeople(
  peopleToSort: Person[],
  sort: string | null,
  order: string | null,
): Person[] {
  const peopleSorted = [...peopleToSort];

  const sorting = (a: Person, b: Person): number => {
    switch (sort) {
      case 'name':
      case 'sex':
        return a[sort].localeCompare(b[sort]);

      case 'born':
      case 'died':
        return a[sort] - b[sort];

      default:
        return 0;
    }
  };

  return order === 'desc'
    ? peopleSorted.sort((a, b) => sorting(b, a))
    : peopleSorted.sort((a, b) => sorting(a, b));
}

export function filterByQuery(
  person: Person,
  query: string,
): boolean | undefined {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.toLowerCase();

  return (
    person.name.toLowerCase().includes(normalizedQuery) ||
    person.fatherName?.toLowerCase().includes(normalizedQuery) ||
    person.motherName?.toLowerCase().includes(normalizedQuery)
  );
}

export function filterByCentury(
  person: Person,
  centuries: string[],
): boolean | undefined {
  if (centuries.length === 0) {
    return true;
  }

  return centuries.includes(Math.ceil(person.born / 100).toString());
}

export function filterBySex(person: Person, sex: string): boolean | undefined {
  if (!sex) {
    return true;
  }

  return person.sex === sex;
}
