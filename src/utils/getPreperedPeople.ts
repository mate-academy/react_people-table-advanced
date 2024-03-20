import { Person } from '../types';
import { getCorrectData } from './getCorrectData';

export const getPreperedPeople = (
  people: Person[],
  params: URLSearchParams,
) => {
  const sort = params.get('sort') || '';
  const order = params.get('order') || '';
  const sex = params.get('sex') || '';
  const query = params.get('query') || '';
  const centuries = params.getAll('centuries') || [];

  let preperedPeople = [...people];

  if (query) {
    const correctQuery = getCorrectData(query);

    preperedPeople = preperedPeople.filter(
      person =>
        getCorrectData(person.name).includes(correctQuery) ||
        getCorrectData(person.motherName).includes(correctQuery) ||
        getCorrectData(person.fatherName).includes(correctQuery),
    );
  }

  if (sex) {
    preperedPeople = preperedPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    preperedPeople = preperedPeople.filter(person => {
      const centryBorn = String(Math.ceil(person.born / 100));

      return centuries.includes(centryBorn);
    });
  }

  if (sort) {
    preperedPeople.sort((a, b) => {
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

  if (sort && order) {
    preperedPeople.reverse().sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return b[sort].localeCompare(a[sort]);
        case 'born':
        case 'died':
          return b[sort] - a[sort];

        default:
          return 0;
      }
    });
  }

  return preperedPeople;
};
