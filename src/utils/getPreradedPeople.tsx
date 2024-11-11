import { URLSearchParams } from 'url';
import { Person, SortOptions } from '../types';

export const getPreparedPeople = (
  people: Person[],
  queryParams: URLSearchParams,
): Person[] => {
  let preparedPeople = [...people];
  const query = queryParams.get('query')?.trim().toLowerCase();

  const sex = queryParams.get('sex');
  const centuries = queryParams.getAll('centuries');

  const sort = queryParams.get('sort');
  const order = queryParams.get('order') === 'desc' ? -1 : 1;

  if (query) {
    preparedPeople = preparedPeople.filter(
      person =>
        person.name.toLowerCase().includes(query) ||
        (person.motherName &&
          person.motherName.toLowerCase().includes(query)) ||
        (person.fatherName && person.fatherName.toLowerCase().includes(query)),
    );
  }

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    preparedPeople = preparedPeople.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sort) {
    preparedPeople.sort((a, b) => {
      switch (sort) {
        case SortOptions.NAME.toLowerCase():
          return a.name.localeCompare(b.name) * order;
        case SortOptions.SEX.toLowerCase():
          return a.sex.localeCompare(b.sex) * order;
        case SortOptions.BORN.toLowerCase():
          return (a.born - b.born) * order;
        case SortOptions.DIED.toLowerCase():
          return (a.died - b.died) * order;
        default:
          return 0;
      }
    });
  }

  return preparedPeople;
};
