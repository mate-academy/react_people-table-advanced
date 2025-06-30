import { Person } from '../types';
import { SexFilterType } from '../types/FilterTypes';
import { SortType, SortTypes } from '../types/SortTypes';

export function filterAndSortPeople(
  people: Person[],
  sex: SexFilterType,
  centuries: string[],
  query: string,
  sort: SortType,
  order: 'asc' | 'desc' | null,
) {
  const direction = order === 'desc' ? -1 : 1;
  let peopleCopy = [...people];

  if (sex) {
    peopleCopy = peopleCopy.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    peopleCopy = peopleCopy.filter(person => {
      const birthCentury = `${Math.ceil(person.born / 100)}`;

      return centuries.includes(birthCentury);
    });
  }

  const lowerQuery = query.trim().toLowerCase();

  if (lowerQuery) {
    peopleCopy = peopleCopy.filter(
      person =>
        person.name.toLowerCase().includes(lowerQuery) ||
        person.fatherName?.toLowerCase().includes(lowerQuery) ||
        person.motherName?.toLowerCase().includes(lowerQuery),
    );
  }

  if (sort) {
    if (sort === SortTypes.Name || sort === SortTypes.Sex) {
      peopleCopy.sort(
        (a, b) => (a[sort] ?? '').localeCompare(b[sort] ?? '') * direction,
      );
    } else if (sort === SortTypes.Born || sort === SortTypes.Died) {
      peopleCopy.sort((a, b) => ((a[sort] ?? 0) - (b[sort] ?? 0)) * direction);
    }
  }

  return peopleCopy;
}
