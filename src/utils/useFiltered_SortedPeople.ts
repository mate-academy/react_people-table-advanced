import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export const useFilteredSortedPeople = (
  people: Person[],
): {
  sortedPeople: Person[];
  order: string | null;
  typeSort: string | null;
} => {
  const [searchParams] = useSearchParams();
  const selectedCenturies = searchParams
    .getAll('centuries')
    .map(item => Number(item));
  const selectedSex = searchParams.get('sex');
  const order = searchParams.get('order');
  const typeSort = searchParams.get('sort');

  const matchYear = (year: number) => {
    if (!selectedCenturies.length) {
      return true;
    }

    const minYear = Math.min(...selectedCenturies) * 100 - 100;
    const maxYear = Math.max(...selectedCenturies) * 100;

    return year >= minYear && year < maxYear;
  };

  const filteredPeople = people.filter(person => {
    const query = searchParams.get('query')?.toLowerCase() || '';

    const matchesQuery =
      person.name.toLowerCase().includes(query) ||
      person.motherName?.toLowerCase().includes(query) ||
      person.fatherName?.toLowerCase().includes(query);

    const matchesYear = matchYear(person.born);
    const matchSex = selectedSex === null || person.sex === selectedSex;

    return matchesQuery && matchSex && matchesYear;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    const sortField = typeSort as keyof Person;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue && bValue) {
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    }

    return 0;
  });

  return { sortedPeople, order, typeSort };
};
