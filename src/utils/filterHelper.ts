import { Person } from '../types';

type TFilterPeople<T> = (people: Person[], query: T) => Person[];

const includes = (str: string | null, part: string) => (
  (str || '').toLowerCase().includes(part.toLowerCase())
);

const filterByQuery: TFilterPeople<string> = (people, query) => {
  return people.filter(({
    name,
    motherName,
    fatherName,
  }) => (
    includes(name, query)
    || includes(motherName, query)
    || includes(fatherName, query)
  ));
};

const filterBySex: TFilterPeople<string> = (people, query) => {
  return people.filter(({ sex }) => sex === query);
};

const filterByCenturies: TFilterPeople<string[]> = (people, query) => {
  return people.filter(({ born }) => query.includes(`${Math.ceil(born / 100)}`));
};

export const filterPeople = (
  peopleToFilter: Person[],
  searchParams: URLSearchParams,
) => {
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  let filtered = [...peopleToFilter];

  if (query) {
    filtered = filterByQuery(filtered, query);
  }

  if (sex) {
    filtered = filterBySex(filtered, sex);
  }

  if (centuries.length) {
    filtered = filterByCenturies(filtered, centuries);
  }

  return filtered;
};
