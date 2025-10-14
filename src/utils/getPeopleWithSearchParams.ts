import { Person } from '../types';

type FilterHandler = (person: Person, value: string | string[]) => boolean;

export function getPeopleWithSearchParams(
  people: Person[],
  params: URLSearchParams,
) {
  const filterHandlers: Record<string, FilterHandler> = {
    sex: (person, value) => person.sex === String(value),
    query: (person, value) => {
      const valueLowerCase = String(value).toLocaleLowerCase();

      if (
        person.name.toLowerCase().includes(valueLowerCase) ||
        (person.motherName || '').toLowerCase().includes(valueLowerCase) ||
        (person.fatherName || '').toLowerCase().includes(valueLowerCase)
      ) {
        return true;
      }

      return false;
    },
    centuries: (person, value) => {
      const centuries = Array.isArray(value) ? value : [value];
      const personCentury = Math.ceil(person.born / 100);

      return centuries.includes(String(personCentury));
    },
  };

  const filtered = people.filter(person => {
    for (const [key, handler] of Object.entries(filterHandlers)) {
      if (!params.has(key)) {
        continue;
      }

      const values = params.getAll(key);
      const valueForHandler = values.length > 1 ? values : values[0];

      if (!handler(person, valueForHandler)) {
        return false;
      }
    }

    return true;
  });

  const sortBy = params.get('sort');
  const order = params.get('order');

  if (!sortBy) {
    return filtered;
  }

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortBy as keyof Person];
    const bVal = b[sortBy as keyof Person];

    if (aVal == null && bVal == null) {
      return 0;
    } else if (aVal == null) {
      return 1;
    } else if (bVal == null) {
      return -1;
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return order == 'desc' ? bVal - aVal : aVal - bVal;
    }

    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();

    const compare = aStr.localeCompare(bStr);

    return order === 'desc' ? -compare : compare;
  });

  return sorted;
}
