import { Person } from '../../types';

export function sortTable(
  people: Person[],
  field: keyof Person | null,
  order: 'asc' | 'desc' | null,
  originalPeople?: Person[],
) {
  const source = originalPeople ?? people;

  if (!field || !order) {
    return source;
  }

  return [...source].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return order === 'asc'
      ? Number(aValue) - Number(bValue)
      : Number(bValue) - Number(aValue);
  });
}
