import { Person } from '../types/Person';

export const sortPeople = (
  currentPeople: Person[],
  sortBy: string,
  order: string | null,
) => {
  const sortedPeople = [...currentPeople];

  switch (sortBy) {
    case 'name':
    case 'sex': sortedPeople.sort((p1, p2) => {
      if (order) {
        return p2[sortBy].localeCompare(p1[sortBy]);
      }

      return p1[sortBy].localeCompare(p2[sortBy]);
    });
      break;

    case 'born':
    case 'died': sortedPeople.sort((p1, p2) => {
      if (order) {
        return Number(p2[sortBy]) - Number(p1[sortBy]);
      }

      return Number(p1[sortBy]) - Number(p2[sortBy]);
    });
      break;

    default: return sortedPeople;
  }

  return sortedPeople;
};
