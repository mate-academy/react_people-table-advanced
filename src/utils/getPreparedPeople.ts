import { Person } from '../types';

export const getPreparedPeople = (
  array: Person[],
  searchParams: URLSearchParams,
) => {
  const nameQuery = searchParams.get('query');
  const personSex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  let arr = [...array];

  if (nameQuery) {
    arr = arr.filter(person => (
      person.name.toLowerCase().includes(nameQuery)
      || person.fatherName?.toLowerCase().includes(nameQuery)
      || person.motherName?.toLowerCase().includes(nameQuery)
    ));
  }

  if (personSex) {
    arr = arr.filter(person => person.sex === personSex);
  }

  if (centuries.length) {
    const centuriesArr = centuries.map(year => +year);

    arr = arr.filter(person => (
      centuriesArr.includes(Math.ceil(person.born / 100))
    ));
  }

  if (sort) {
    arr = arr.sort((a: Person, b: Person) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);
        case 'born':
        case 'died':
          return +a[sort] - +b[sort];
        default:
          return 0;
      }
    });
  }

  if (order) {
    arr = arr.reverse();
  }

  return arr;
};
