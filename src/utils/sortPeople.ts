import { Person } from '../types/Person';

export const sortPeople = (
  people: Person[],
  sort: string,
  order: string,
) => {
  const sortedPeople = [...people].sort((firstPerson, secondPerson) => {
    switch (sort) {
      case 'name':
        return firstPerson.name.localeCompare(secondPerson.name);
      case 'sex':
        return firstPerson.sex.localeCompare(secondPerson.sex);
      case 'born':
        return firstPerson.born - secondPerson.born;
      case 'died':
        return firstPerson.died - secondPerson.died;

      default:
        return 0;
    }
  });

  return order ? sortedPeople.reverse() : sortedPeople;
};
