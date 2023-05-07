import { Person } from '../types';

export const sortPeople = (people: Person[], sort: string, order: string) => {
  return [...people].sort((firstPerson, secondPerson) => {
    const isDescOrder = order === 'desc';

    const first = isDescOrder ? secondPerson : firstPerson;
    const second = isDescOrder ? firstPerson : secondPerson;

    switch (sort) {
      case 'sex':
        return first.sex.localeCompare(second.sex);
      case 'name':
        return first.name.localeCompare(second.name);
      case 'born':
        return first.born - second.born;
      case 'died':
        return first.died - second.died;
      default:
        return 0;
    }
  });
};
