import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export const useFilteredPeople = (people: Person[]) => {
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams
    .getAll('centuries')
    .map(Number)
    .filter(Boolean);
  const sort = searchParams.get('sort') as keyof Person | null;
  const order = searchParams.get('order');

  const filtered = people.filter(p => {
    if (sex && p.sex !== sex) {
      return false;
    }

    if (
      query &&
      ![p.name, p.motherName, p.fatherName].some(field =>
        (field || '').toLowerCase().includes(query),
      )
    ) {
      return false;
    }

    if (centuries.length > 0) {
      const personCentury =
        typeof p.born === 'number' && p.born > 0
          ? Math.ceil(p.born / 100)
          : null;

      if (!personCentury || !centuries.includes(personCentury)) {
        return false;
      }
    }

    return true;
  });

  if (!sort) {
    return filtered;
  }

  return [...filtered].sort((a, b) => {
    const aVal = a[sort];
    const bVal = b[sort];

    let result = 0;

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      result = aVal - bVal;
    } else if (typeof aVal === 'string' && typeof bVal === 'string') {
      result = aVal.localeCompare(bVal);
    }

    return order === 'desc' ? -result : result;
  });
};
