import { URLSearchParams } from 'url';
import { Person } from '../../types/Person';
import { sortTable } from '../hooks/sortTable';

export function getVisiblePeople(
  people: Person[],
  searchParams: URLSearchParams,
) {
  let result = [...people];

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('numeric');
  const sort = searchParams.get('sort') as keyof Person | null;
  const order = searchParams.get('order') as 'asc' | 'desc' | null;

  if (query) {
    result = result.filter(p => p.name.toLowerCase().includes(query));
  }

  if (sex) {
    result = result.filter(p => p.sex === sex);
  }

  if (centuries.length) {
    result = result.filter(p => {
      const century = Math.ceil(p.born / 100).toString();

      return centuries.includes(century);
    });
  }

  const filteredPeople = [...result];

  result = sortTable(result, sort, order, filteredPeople);

  return result;
}
