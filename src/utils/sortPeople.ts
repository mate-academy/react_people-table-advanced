import { Person } from '../types';

export const sortPeople = (
  people: Person[],
  sortType: string | null,
  isReversed: boolean,
) => {
  if (sortType) {
    people.sort((p1, p2) => {
      switch (sortType) {
        case 'name':
        case 'sex':
          return isReversed
            ? p2[sortType].localeCompare(p1[sortType])
            : p1[sortType].localeCompare(p2[sortType]);

        case 'born':
        case 'died':
          return isReversed
            ? p2[sortType] - p1[sortType]
            : p1[sortType] - p2[sortType];

        default:
          return 0;
      }
    });
  }

  return people;
};
