import { Person } from '../types';

export function getVisiblePeople(
  people: Person[],
  query: string,
  sex: string | null,
  centuries: string[],
  sort: string | null,
  order: string | null,
): Person[] {
  let visiblePeople = [...people];

  const normalizedQuery = query.trim().toLowerCase();

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  if (normalizedQuery !== '') {
    visiblePeople = visiblePeople.filter(person => {
      const nameMatch = person.name.toLowerCase().includes(normalizedQuery);

      const motherMatch = (person.motherName || '')
        .toLowerCase()
        .includes(normalizedQuery);

      const fatherMatch = (person.fatherName || '')
        .toLowerCase()
        .includes(normalizedQuery);

      return nameMatch || motherMatch || fatherMatch;
    });
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
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
  }

  if (sort && order === 'desc') {
    visiblePeople.reverse();
  }

  return visiblePeople;
}
