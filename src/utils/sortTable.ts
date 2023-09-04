import { Person } from '../types';

export const sortTable = (data: Person[], sortBy: string, orderBy: string) => {
  const peopleDataCopy = [...data];

  peopleDataCopy.sort((p1, p2) => {
    switch (sortBy) {
      case 'born':
      case 'died':
        return p1[sortBy] - p2[sortBy];
      case 'name':
      case 'sex':
        return p1[sortBy].localeCompare(p2[sortBy]);
      default:
        return 0;
    }
  });

  if (orderBy.length) {
    peopleDataCopy.reverse();
  }

  return peopleDataCopy;
};
