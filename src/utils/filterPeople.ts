import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  searchParams: URLSearchParams,
): Person[] => {
  const SEX_PARAM = 'sex';
  const QUERY_PARAM = 'query';
  const CENTURY_PARAM = 'century';
  const SORT_PARAM = 'sort';
  const ORDER_PARAM = 'order';

  const sex = searchParams.get(SEX_PARAM) || '';
  const query = searchParams.get(QUERY_PARAM) || '';
  const century = searchParams.getAll(CENTURY_PARAM);
  const sort = searchParams.get(SORT_PARAM) || '';
  const order = searchParams.get(ORDER_PARAM) || '';

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
