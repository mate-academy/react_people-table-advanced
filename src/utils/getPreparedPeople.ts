import { Person } from '../types/Person';
import { SortType } from '../types/SortType';

const getCorrectData = (str: string | null) => (str ? str.toLowerCase() : '');

const filterByQuery = (person: Person, correctQuery: string) =>
  [person.name, person.motherName, person.fatherName]
    .map(getCorrectData)
    .some(data => data.includes(correctQuery));

const filterBySex = (person: Person, sex: string) => person.sex === sex;

const filterByCenturies = (person: Person, centuries: number[]) =>
  centuries.includes(Math.ceil(person.born / 100));

export const getPreperedPeople = (
  people: Person[],
  params: URLSearchParams,
) => {
  const sort = params.get('sort') || '';
  const order = params.get('order') || '';
  const sex = params.get('sex') || '';
  const query = params.get('query') || '';
  const centuries = params.getAll('centuries').map(Number) || [];

  let preparedPeople = [...people];

  if (query) {
    const correctQuery = getCorrectData(query);

    preparedPeople = preparedPeople.filter(person =>
      filterByQuery(person, correctQuery),
    );
  }

  if (sex) {
    preparedPeople = preparedPeople.filter(person => filterBySex(person, sex));
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(person =>
      filterByCenturies(person, centuries),
    );
  }

  if (sort && order) {
    preparedPeople.sort((a, b) => {
      let result;

      switch (sort) {
        case SortType.NAME:
        case SortType.SEX:
          result = a[sort].localeCompare(b[sort]);
          break;
        case SortType.BORN:
        case SortType.DIED:
          result = a[sort] - b[sort];
          break;
        default:
          result = 0;
      }

      return order === 'desc' ? -result : result;
    });
  }

  return preparedPeople;
};
