import { People } from '../types/People';

export const filter = (data: People[], query: string): People[] => {
  return data
    .filter(el => {
      const queryLC = query.toLowerCase();

      let check = false;

      if (el.name.toLowerCase().includes(queryLC)) {
        check = true;
      }

      if (el.fatherName) {
        if (el.fatherName.toLowerCase().includes(queryLC)) {
          check = true;
        }
      }

      if (el.motherName) {
        if (el.motherName.toLowerCase().includes(queryLC)) {
          check = true;
        }
      }

      return check;
    });
};

const sortFoo
= (array: People[],
  searchSortBy: string | null,
  sortOrder: string): People[] => {
  if (searchSortBy === null) {
    return array;
  }

  const sortedArray = array.sort((a, b) => {
    switch (searchSortBy) {
      case 'born':
      case 'died':
        if (sortOrder === 'asc') {
          return a[searchSortBy] - b[searchSortBy];
        }

        return b[searchSortBy] - a[searchSortBy];
      case 'name':
      case 'sex':
      case 'slug':
        if (sortOrder === 'asc') {
          return a[searchSortBy].localeCompare(b[searchSortBy]);
        }

        return b[searchSortBy].localeCompare(a[searchSortBy]);
      case 'mother':
        if (sortOrder === 'asc') {
          return a.motherName.localeCompare(b.motherName);
        }

        return b.motherName.localeCompare(a.motherName);
      case 'father':
        if (sortOrder === 'asc') {
          return a.fatherName.localeCompare(b.fatherName);
        }

        return b.fatherName.localeCompare(a.fatherName);
      default:
        return 0;
    }
  });

  return sortedArray;
};

export default sortFoo;
