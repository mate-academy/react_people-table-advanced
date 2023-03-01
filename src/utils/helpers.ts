import { Person } from '../types';

export const sortPeople = (
  peopleArr: Person[],
  sort: string | null,
  order: string | null,
) => {
  const peopleCopy = [...peopleArr];

  switch (sort) {
    case 'name':
    case 'sex':
      peopleCopy.sort((a, b) => a[sort].localeCompare(b[sort]));
      break;

    case 'born':
    case 'died':
      peopleCopy.sort((a, b) => a[sort] - b[sort]);
      break;
    default:
      return peopleCopy;
  }

  if (order) {
    return peopleCopy.reverse();
  }

  return peopleCopy;
};

export const addSortParams = (
  sortValue: string,
  searchParams: URLSearchParams,
) => {
  const newParams = new URLSearchParams(
    searchParams.toString(),
  );

  if (searchParams.get('sort') !== sortValue) {
    newParams.set('sort', sortValue);
  } else {
    newParams.append('order', 'desc');
  }

  if (searchParams.get('sort') && searchParams.get('order')) {
    newParams.delete('sort');
    newParams.delete('order');
  }

  return newParams.toString();
};
