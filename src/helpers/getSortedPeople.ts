import { Person } from '../types';

type SortData = {
  sort: string;
  order: string;
};

export function getSortedPeople(
  people: Person[],
  sortData: SortData,
) {
  const { sort, order } = sortData;

  const callBack = (a: Person, b: Person) => {
    if (sort === 'name' || sort === 'sex') {
      return order
        ? b[sort].localeCompare(a[sort])
        : a[sort].localeCompare(b[sort]);
    }

    if (sort === 'born' || sort === 'died') {
      return order
        ? b[sort] - (a[sort])
        : a[sort] - (b[sort]);
    }

    return 0;
  };

  return people.sort(callBack);
}
