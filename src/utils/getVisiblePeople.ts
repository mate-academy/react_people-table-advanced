import type { Person } from '../types/Person';

type SortField = 'name' | 'sex' | 'born' | 'died';

const sortFields: SortField[] = ['name', 'sex', 'born', 'died'];

export function getVisiblePeople(
  people: Person[],
  searchParams: URLSearchParams,
): Person[] {
  const query = (searchParams.get('query') || '').trim().toLowerCase();

  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = people.filter(person => {
    const matchesName = [
      person.name,
      person.motherName,
      person.fatherName,
    ].some(name => (name || '').toLowerCase().includes(query));

    const century = Math.ceil(person.born / 100);

    const matchesCentury =
      centuries.length === 0 || centuries.includes(String(century));

    return matchesName && matchesCentury;
  });

  if (!sort || !sortFields.includes(sort as SortField)) {
    return filteredPeople;
  }

  const sortField = sort as SortField;

  return [...filteredPeople].sort((a, b) => {
    let comparison = 0;

    if (sortField === 'name' || sortField === 'sex') {
      comparison = a[sortField].localeCompare(b[sortField]);
    } else {
      comparison = a[sortField] - b[sortField];
    }

    return order === 'desc' ? -comparison : comparison;
  });
}
