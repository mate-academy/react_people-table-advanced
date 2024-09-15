import { Person } from '../types/Person';

export const sortPeople = (
  people: Person[],
  sortKey: string | null,
  order: string | null,
) => {
  const peopleCopy = [...people];

  switch (sortKey) {
    case 'name':
    case 'sex':
      return peopleCopy.sort((a, b) =>
        order === 'desc'
          ? b[sortKey].localeCompare(a[sortKey])
          : a[sortKey].localeCompare(b[sortKey]),
      );

    case 'born':
    case 'died':
      return peopleCopy.sort((a, b) =>
        order === 'desc' ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey],
      );

    default:
      return people;
  }
};
