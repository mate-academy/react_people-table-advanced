import { Person } from '../types';

export const filter = (
  people: Person[],
  searchParams: URLSearchParams,
): Person[] => {
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('century');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  let filteredPeople = [...people];

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    filteredPeople = filteredPeople.filter(person => {
      const normName = person.name.toLowerCase().trim();

      return normName.includes(normalizedQuery);
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (century.length) {
    filteredPeople = filteredPeople.filter(({ born }) =>
      century.includes(Math.ceil(born / 100).toString()),
    );
  }

  if (sort) {
    filteredPeople = filteredPeople.sort((a, b) => {
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
  }

  if (order) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};
