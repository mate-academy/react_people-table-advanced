import { Person } from '../types';

type TSortPeople = (people: Person[], key: string) => Person[];

const sortByKey: TSortPeople = (people, key) => {
  switch (key) {
    case 'born':
    case 'died':
      return [...people].sort((a, b) => Number(a[key]) - Number(b[key]));
    case 'name':
    case 'sex':
      return [...people].sort((a, b) => (
        String(a[key]).localeCompare(String(b[key]))
      ));
    default:
      return people;
  }
};

export const sortPeople = (
  peopleToSort: Person[],
  searchParams: URLSearchParams,
) => {
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  let sortetPeople = [...peopleToSort];

  if (sort) {
    sortetPeople = sortByKey(sortetPeople, sort);
  }

  if (order) {
    sortetPeople.reverse();
  }

  return sortetPeople;
};
