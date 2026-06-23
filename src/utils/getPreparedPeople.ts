import { Person } from '../types/Person';

type FilterParams = {
  sex: string | null;
  query: string | null;
  centuries: string[];
  sort: string | null;
  order: string | null;
};

export function getPreparedPeople(
  people: Person[],
  { sex, query, centuries, sort, order }: FilterParams,
): Person[] {
  let result = [...people];

  if (sex) {
    result = result.filter(person => person.sex === sex);
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    result = result.filter(person =>
      [person.name, person.motherName, person.fatherName].some(field =>
        field?.toLowerCase().includes(normalizedQuery),
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
          return a.name.localeCompare(b.name);
        case 'sex':
          return a.sex.localeCompare(b.sex);
        case 'born':
          return a.born - b.born;
        case 'died':
          return a.died - b.died;
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
