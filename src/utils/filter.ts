import { Person } from '../types';

const getListBySex = (sex: string | string[], list: Person[]) => {
  switch (sex) {
    case 'm':
      return [...list].filter(person => person.sex === 'm');
    case 'f':
      return [...list].filter(person => person.sex === 'f');
    default:
      return [...list];
  }
};

const getList = (
  currentSort: string | null,
  list: Person[],
  isDesc: boolean,
) => {
  if (!currentSort) {
    return list;
  }

  const sorted = [...list];

  if (currentSort === 'name' || currentSort === 'sex') {
    sorted.sort((a, b) => a[currentSort].localeCompare(b[currentSort]));
  } else if (currentSort === 'born' || currentSort === 'died') {
    sorted.sort((a, b) => a[currentSort] - b[currentSort]);
  }

  return isDesc ? sorted.reverse() : sorted;
};

const getListByQuery = (list: Person[], query: string | string[]) => {
  if (Array.isArray(query)) {
    return [...list];
  }

  if (!query || query.length === 0) {
    return [...list];
  }

  return [...list].filter(
    person =>
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      (person.motherName &&
        person.motherName.toLowerCase().includes(query.toLowerCase())) ||
      (person.fatherName &&
        person.fatherName.toLowerCase().includes(query.toLowerCase())),
  );
};

const getListByCenturies = (list: Person[], centuries: string[]) => {
  if (centuries.length === 0) {
    return list;
  }

  return list.filter(person =>
    centuries.some(c => +c === Math.floor(person.born / 100) + 1),
  );
};

export const makeSort = (list: Person[], search: URLSearchParams) => {
  let newList = [...list];

  const sex = search.get('sex');
  const query = search.get('query');
  const centuries = search.getAll('centuries');
  const sortField = search.get('sort');
  const isDesc = search.has('order');

  newList = getList(sortField, newList, isDesc);
  newList = getListBySex(sex ?? '', newList);
  newList = getListByQuery(newList, query ?? '');
  newList = getListByCenturies(newList, centuries);

  return newList;
};
