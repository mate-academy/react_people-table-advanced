import { Person } from '../types/Person';

export function filterPeople(
  people: Person[],
  query: string,
  centuries: string[],
  sex: string,
): Person[] {
  let filtered = [...people];

  if (query) {
    const lowerQuery = query.toLowerCase();

    filtered = filtered.filter(person => {
      const nameMatch = person.name.toLowerCase().includes(lowerQuery);
      const motherMatch = person.motherName?.toLowerCase().includes(lowerQuery);
      const fatherMatch = person.fatherName?.toLowerCase().includes(lowerQuery);

      return nameMatch || motherMatch || fatherMatch;
    });
  }

  if (sex) {
    filtered = filtered.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    filtered = filtered.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(century.toString());
    });
  }

  return filtered;
}

export function sortPeople(
  people: Person[],
  sortField: string | null,
  sortOrder: string | null,
): Person[] {
  if (!sortField) {
    return people;
  }

  const sorted = [...people].sort((a, b) => {
    const aValue = a[sortField as keyof Person];
    const bValue = b[sortField as keyof Person];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue;
    }

    return 0;
  });

  if (sortOrder === 'desc') {
    return sorted.reverse();
  }

  return sorted;
}
