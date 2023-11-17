import { Person } from '../types';

export function getSortFunction(
  arr: Person[],
  sort: string,
  order: string,
) {
  const sortedPeopleCopy = [...arr];

  if (sort) {
    sortedPeopleCopy.sort((a, b) => {
      let comparison = 0;

      switch (sort) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'sex':
          comparison = a.sex.localeCompare(b.sex);
          break;
        case 'born':
          comparison = a.born - b.born;
          break;
        case 'died':
          comparison = a.died - b.died;
          break;
        default:
          break;
      }

      return order === 'desc' ? comparison * -1 : comparison;
    });
  }

  return sortedPeopleCopy;
}
