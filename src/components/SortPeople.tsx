import { Person } from '../types';

export const sortPeople = (
  people: Person[],
  sort: string,
  order: string,
  centuries: string[],
  sex: string | null,
  query: string | null,
) => {
  let sorted = [...people];

  if (query) {
    sorted = sorted.filter(
      p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        p.fatherName?.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (centuries.length > 0) {
    sorted = sorted.filter(p =>
      centuries.includes(Math.ceil(p.born / 100).toString()),
    );
  }

  if (sex) {
    sorted = sorted.filter(p => p.sex === sex);
  }

  if (sort === 'null') {
    return sorted;
  }

  sorted.sort((a, b) => {
    if (sort === 'name') {
      return a.name.localeCompare(b.name);
    }

    if (sort === 'sex') {
      return a.sex.localeCompare(b.sex);
    }

    if (sort === 'born' || sort === 'died') {
      return a[sort] - b[sort];
    }

    return 0;
  });

  if (order === 'desc') {
    sorted.reverse();
  }

  return sorted;
};
