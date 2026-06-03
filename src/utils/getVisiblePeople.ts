import { Person } from '../types';

export const getVisiblePeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  let visiblePeople = [...people];

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    visiblePeople = visiblePeople.filter(person => {
      return (
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery)
      );
    });
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const bornCentury = Math.ceil(person.born / 100);

      return centuries.includes(bornCentury.toString());
    });
  }

  if (sort) {
    visiblePeople.sort((first, second) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return first[sort].localeCompare(second[sort]);

        case 'born':
        case 'died':
          return first[sort] - second[sort];

        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
