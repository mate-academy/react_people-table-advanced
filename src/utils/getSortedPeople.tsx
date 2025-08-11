import { Person } from '../types';

export const getSortedPeople = (
  sort: string,
  order: string,
  people: Person[],
) => {
  const sortedPeople = [...people];

  if (sort !== '') {
    sortedPeople.sort((person1, person2) => {
      let comparison = 0;

      switch (sort) {
        case 'name':
          comparison = person1.name.localeCompare(person2.name);
          break;

        case 'sex':
          comparison = person1.sex.localeCompare(person2.sex);
          break;

        case 'born':
          comparison = person1.born - person2.born;
          break;

        case 'died':
          comparison = person1.died - person2.died;
          break;

        default:
          comparison = 0;
      }

      if (order === 'desc') {
        return comparison * -1;
      }

      return comparison;
    });
  }

  return sortedPeople;
};
