import { Person } from '../types';

export const getSortedPeople = (
  sort: string,
  order: string,
  people: Person[],
) => {
  const sortedPeople = [...people];

  if (sort !== '') {
    sortedPeople.sort((person1, person2) => {
      let compar = 0;

      switch (sort) {
        case 'name':
          compar = person1.name.localeCompare(person2.name);
          break;

        case 'sex':
          compar = person1.sex.localeCompare(person2.sex);
          break;

        case 'born':
          compar = person1.born - person2.born;
          break;

        case 'died':
          compar = person1.died - person2.died;
          break;

        default:
          compar = 0;
      }

      if (order === 'desc') {
        return compar * -1;
      }

      return compar;
    });
  }

  return sortedPeople;
};
