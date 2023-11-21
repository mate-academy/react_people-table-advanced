import { Person, SortBy, SortOrder } from '../types';

export const sort = (peoples: Person[], sortBy: SortBy, order: SortOrder) => {
  let newPeoples = [...peoples];

  switch (sortBy) {
    case 'born':
    case 'died':
      newPeoples = newPeoples.sort((a, b) => b[sortBy] - a[sortBy]);
      break;
    case 'sex':
    case 'name':
      newPeoples = newPeoples
        .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
      break;
    default:
      break;
  }

  if (order === 'desc') {
    newPeoples.reverse();
  }

  return newPeoples;
};
