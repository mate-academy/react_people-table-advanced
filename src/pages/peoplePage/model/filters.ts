import { Person } from '@entities/person';
import { SearchKeys, Sort } from '../types';
import { UrlState } from './useURLReducer';

type FilterTypes = {
  [SearchKeys.QUERY]: (
    query: UrlState[SearchKeys.QUERY],
    arr: Person[],
  ) => Person[];
  [SearchKeys.CENT]: (
    centuries: UrlState[SearchKeys.CENT],
    arr: Person[],
  ) => Person[];
  [SearchKeys.SEX]: (sex: UrlState[SearchKeys.SEX], arr: Person[]) => Person[];
  [SearchKeys.SORT]: (
    sort: UrlState[SearchKeys.SORT],
    reverse: UrlState[SearchKeys.ORDER],
    arr: Person[],
  ) => Person[];
};

const filterByName: FilterTypes[SearchKeys.QUERY] = (query, arr) => {
  if (query === '') {
    return arr;
  }

  const includesName = (name: string) => {
    if (name === '-') {
      return false;
    }

    return name.toLowerCase().includes(query.toLowerCase());
  };

  return arr.filter(
    el =>
      includesName(el.name) ||
      includesName(el.motherName) ||
      includesName(el.fatherName),
  );
};

const filterByCentury: FilterTypes[SearchKeys.CENT] = (stateCenturies, arr) => {
  if (stateCenturies.length === 0) {
    return arr;
  }

  return arr.filter(el => {
    const cent = (Math.floor(el.born / 100) + 1).toString();

    return stateCenturies.some(ct => ct === cent);
  });
};

const filterBySex: FilterTypes[SearchKeys.SEX] = (sex, arr) => {
  if (sex === '') {
    return arr;
  }

  return arr.filter(el => el.sex === (sex === 'male' ? 'm' : 'f'));
};

const filterSort: FilterTypes[SearchKeys.SORT] = (sort, reverse, arr) => {
  if (sort === '') {
    return arr;
  }

  let compare;

  const isReversed = reverse === 'desc';

  switch (sort) {
    case Sort.NAME:
      compare = isReversed
        ? (a: Person, b: Person) => b.name.localeCompare(a.name)
        : (a: Person, b: Person) => a.name.localeCompare(b.name);
      break;
    case Sort.BORN:
      compare = isReversed
        ? (a: Person, b: Person) => b.born - a.born
        : (a: Person, b: Person) => a.born - b.born;
      break;
    case Sort.DIED:
      compare = isReversed
        ? (a: Person, b: Person) => b.died - a.died
        : (a: Person, b: Person) => a.died - b.died;
      break;
    case Sort.SEX:
      compare = isReversed
        ? (a: Person, b: Person) => b.sex.localeCompare(a.sex)
        : (a: Person, b: Person) => a.sex.localeCompare(b.sex);
      break;
  }

  return arr.sort(compare);
};

const filter = {
  name: filterByName,
  century: filterByCentury,
  sex: filterBySex,
  sort: filterSort,
};

export { filter };
