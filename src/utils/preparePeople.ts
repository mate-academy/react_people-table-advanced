import { Person } from '../types/Person';

export const SORT_FIELDS = ['name', 'sex', 'born', 'died'] as const;

export type SortField = (typeof SORT_FIELDS)[number];

export function isSortField(value: string | null): value is SortField {
  return SORT_FIELDS.includes(value as SortField);
}

/**
 * Links every person with the mother and the father from the same list
 */
export function addParents(people: Person[]): Person[] {
  return people.map(person => ({
    ...person,
    mother: people.find(({ name }) => name === person.motherName),
    father: people.find(({ name }) => name === person.fatherName),
  }));
}

/**
 * Filters and sorts people according to the given search params
 */
export function preparePeople(
  people: Person[],
  searchParams: URLSearchParams,
): Person[] {
  const sex = searchParams.get('sex');
  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  const visiblePeople = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (query) {
      const names = [person.name, person.motherName, person.fatherName];

      if (!names.some(name => name?.toLowerCase().includes(query))) {
        return false;
      }
    }

    if (centuries.length > 0) {
      const century = Math.ceil(person.born / 100).toString();

      if (!centuries.includes(century)) {
        return false;
      }
    }

    return true;
  });

  if (isSortField(sort)) {
    visiblePeople.sort((personA, personB) => {
      const a = personA[sort];
      const b = personB[sort];

      return typeof a === 'number' && typeof b === 'number'
        ? a - b
        : String(a).localeCompare(String(b));
    });

    if (isReversed) {
      visiblePeople.reverse();
    }
  }

  return visiblePeople;
}
