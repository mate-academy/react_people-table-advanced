import { Person } from '../types';

export function getFilteredPeople(
  people: Person[],
  queryLower: string,
  sex: string | null,
  selectedCenturies: string[],
) {
  return people.filter(person => {
    const matchesQuery =
      !queryLower ||
      person.name.toLowerCase().includes(queryLower) ||
      (person.motherName &&
        person.motherName.toLowerCase().includes(queryLower)) ||
      (person.fatherName &&
        person.fatherName.toLowerCase().includes(queryLower));

    const matchesSex = !sex || person.sex === sex;

    const matchesCentury =
      selectedCenturies.length === 0 ||
      selectedCenturies.includes(String(Math.ceil(person.born / 100)));

    return matchesQuery && matchesSex && matchesCentury;
  });
}

export function getSortedPeople(
  people: Person[],
  sort: string | null,
  order: string | null,
) {
  const peopleToSort = [...people];

  if (!sort) {
    return peopleToSort;
  }

  peopleToSort.sort((a, b) => {
    const aValue = a[sort as keyof Person];
    const bValue = b[sort as keyof Person];

    if (aValue === null && bValue === null) {
      return 0;
    }

    if (aValue === null) {
      return 1;
    }

    if (bValue === null) {
      return -1;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'desc' ? bValue - aValue : aValue - bValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'desc'
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    }

    const aStr = String(aValue);
    const bStr = String(bValue);

    return order === 'desc'
      ? bStr.localeCompare(aStr)
      : aStr.localeCompare(bStr);
  });

  return peopleToSort;
}

export function getSortIcon(
  sort: string | null,
  order: string | null,
  field: string,
) {
  if (sort !== field) {
    return 'fas fa-sort';
  }

  if (order === 'asc' || !order) {
    return 'fas fa-sort-up';
  }

  if (order === 'desc') {
    return 'fas fa-sort-down';
  }

  return 'fas fa-sort';
}
