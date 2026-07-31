import { Person } from '../types';
import { SortField } from '../types/SortField';

export function filterPeople(
  people: Person[],
  searchParams: URLSearchParams,
): Person[] {
  let filteredPeople = people;

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normalizeQuery = query.trim().toLowerCase();

    filteredPeople = filteredPeople.filter(person => {
      const personName = person.name.toLowerCase().includes(normalizeQuery);
      const motherName = person.motherName
        ?.toLowerCase()
        .includes(normalizeQuery);
      const fatherName = person.fatherName
        ?.toLowerCase()
        .includes(normalizeQuery);

      return personName || motherName || fatherName;
    });
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  if (sort) {
    filteredPeople = [...filteredPeople].sort((a, b) => {
      let result = 0;

      switch (sort) {
        case 'name':
          result = a.name.localeCompare(b.name, undefined, {
            sensitivity: 'base',
          });
          break;
        case 'sex':
          result = a.sex.localeCompare(b.sex, undefined, {
            sensitivity: 'base',
          });
          break;
        case 'born':
          result = a.born - b.born;
          break;
        case 'died':
          result = a.died - b.died;
          break;
      }

      return order === 'desc' ? -result : result;
    });
  }

  return filteredPeople;
}
