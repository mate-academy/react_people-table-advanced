import { SortBy } from '../enums/SortBy';
import { Person } from '../types/Person';

export const sortPeopleBy = (
  people: Person[],
  sortBy: SortBy,
  sortOrder: string,
): Person[] => {
  if (sortBy === SortBy.None) {
    return people;
  }

  return people.sort((personA, personB) => {
    switch (sortBy) {
      case SortBy.Name:
      case SortBy.Sex:
        return sortOrder === 'desc'
          ? personB[sortBy].localeCompare(personA[sortBy])
          : personA[sortBy].localeCompare(personB[sortBy]);

      case SortBy.Born:
      case SortBy.Died:
        return sortOrder === 'desc'
          ? personB[sortBy] - personA[sortBy]
          : personA[sortBy] - personB[sortBy];

      default:
        return 0;
    }
  });
};
