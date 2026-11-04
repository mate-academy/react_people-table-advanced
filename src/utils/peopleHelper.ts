import { Person } from '../types/Person';

export const sortFields = ['name', 'sex', 'born', 'died'] as const;

export function getVisiblePeople(people: Person[], params: URLSearchParams) {
  const query = (params.get('query') || '').trim().toLowerCase();
  const sex = params.get('sex');
  const centuries = params.getAll('centuries');
  const sort = params.get('sort');
  const direction = params.get('order') === 'desc' ? -1 : 1;
  const result = people.filter(person => {
    const matchesQuery = [
      person.name,
      person.motherName,
      person.fatherName,
    ].some(name => name?.toLowerCase().includes(query));

    return (
      matchesQuery &&
      (!sex || person.sex === sex) &&
      (!centuries.length ||
        centuries.includes(String(Math.ceil(person.born / 100))))
    );
  });

  switch (sort) {
    case 'name':
    case 'sex':
      return result.sort((a, b) => direction * a[sort].localeCompare(b[sort]));
    case 'born':
    case 'died':
      return result.sort((a, b) => direction * (a[sort] - b[sort]));
    default:
      return result;
  }
}
