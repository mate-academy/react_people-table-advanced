import { Person } from '../types';

export const getPreparedPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  let result = [...people];

  if (query) {
    result = people.filter(person =>
      person.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (sex) {
    result = result.filter(person => {
      switch (sex) {
        case 'm':
          return person.sex === 'm';
        case 'f':
          return person.sex === 'f';
        default:
          return true;
      }
    });
  }

  if (centuries.length) {
    let peopleOfCenturies: Person[] = [];

    for (let i = 16; i < 21; i += 1) {
      if (centuries.includes(`${i}`)) {
        peopleOfCenturies = [
          ...peopleOfCenturies,
          ...result.filter(person => Math.ceil(person.born / 100) === i),
        ];
      }
    }

    result = peopleOfCenturies;
  }

  switch (sort) {
    case 'name':
    case 'sex':
      result.sort((p1, p2) => p1[sort].localeCompare(p2[sort]));
      break;
    case 'born':
    case 'died':
      result.sort((p1, p2) => p1[sort] - p2[sort]);
      break;
    default:
      break;
  }

  if (order) {
    result.reverse();
  }

  return result;
};
