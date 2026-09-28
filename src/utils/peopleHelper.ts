import { Person, SortType } from '../types';

export function getVisiblePeople(
  people: Person[],
  searchParams: URLSearchParams,
): Person[] {
  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const isDescending = searchParams.get('order') === 'desc';
  const visiblePeople = people.filter(person => {
    const matchesSex = !sex || person.sex === sex;
    const matchesQuery = [
      person.name,
      person.motherName,
      person.fatherName,
    ].some(name => name?.toLowerCase().includes(query));
    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(person.born / 100)));

    return matchesSex && matchesQuery && matchesCentury;
  });

  return visiblePeople.sort((first, second) => {
    let comparison = 0;

    switch (sort) {
      case SortType.Name:
      case SortType.Sex:
        comparison = first[sort].localeCompare(second[sort]);
        break;

      case SortType.Born:
      case SortType.Died:
        comparison = first[sort] - second[sort];
        break;

      default:
        break;
    }

    return isDescending ? -comparison : comparison;
  });
}
