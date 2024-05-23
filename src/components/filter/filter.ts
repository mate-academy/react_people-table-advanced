import { Person } from '../../types';

export const filter = (
  people: Person[],
  searchParams: URLSearchParams,
): Person[] => {
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('century');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('query') || '';

  let copy = [...people];

  if (query) {
    const normQuery = query.toLowerCase().trim();

    copy = copy.filter(person => {
      const normName = person.name.toLowerCase().trim();

      return normName.includes(normQuery);
    });
  }

  if (sex) {
    copy = copy.filter(person => person.sex === sex);
  }

  if (century && century.length > 0) {
    copy = copy.filter(person => {
      const notmalizeCentury = Math.ceil(person.born / 100).toString();

      return century.includes(notmalizeCentury);
    });
  }

  if (sort) {
    copy = copy.sort((a, b) => {
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

  if (order) {
    copy = copy.reverse();
  }

  return copy;
};
