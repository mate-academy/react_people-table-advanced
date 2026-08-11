import { Person } from '../types/Person';

type SortField = 'name' | 'sex' | 'born' | 'died';

export function getPreparedPeople(
  people: Person[],
  searchParams: URLSearchParams,
): Person[] {
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  let result = [...people];

  if (sex) {
    result = result.filter(person => person.sex === sex);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    result = result.filter(person =>
      [person.name, person.motherName, person.fatherName].some(name =>
        name?.toLowerCase().includes(normalizedQuery),
      ),
    );
  }

  if (centuries.length > 0) {
    result = result.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  if (sort) {
    result.sort((a, b) => {
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
    });

    if (order === 'desc') {
      result.reverse();
    }
  }

  return result;
}
