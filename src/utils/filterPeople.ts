import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  searchParams: URLSearchParams,
): Person[] => {
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('century');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  let peopleCopy = [...people];

  if (query) {
    const lowerQuery = query.toLowerCase().trim();

    peopleCopy = peopleCopy.filter(person => {
      const lowerName = person.name.toLowerCase().trim();

      return lowerName.includes(lowerQuery);
    });
  }

  if (sex) {
    peopleCopy = peopleCopy.filter(person => person.sex === sex);
  }

  if (century && !!century.length) {
    peopleCopy = peopleCopy.filter(person => {
      const normalizeCentury = Math.ceil(person.born / 100).toString();

      return century.includes(normalizeCentury);
    });
  }

  if (sort) {
    peopleCopy = peopleCopy.sort((a, b) => {
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
    peopleCopy = peopleCopy.reverse();
  }

  return peopleCopy;
};
