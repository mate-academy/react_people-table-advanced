import { Person } from '../types';

export const getSortedPeople = (
  people: Person[] | null,
  sort: string | null,
  order: string | null,
) => {
  const peopleCopy = people ? [...people] : [];
  const men = peopleCopy.filter(person => person.sex === 'm');
  const women = peopleCopy.filter(person => person.sex === 'f');

  switch (sort) {
    case 'name':
      return peopleCopy.sort((a, b) => {
        if (order) {
          return b.name.localeCompare(a.name);
        }

        return a.name.localeCompare(b.name);
      });
    case 'sex':
      if (order) {
        return [
          ...men.reverse(),
          ...women.reverse(),
        ];
      }

      return [
        ...women,
        ...men,
      ];
    case 'born':
      if (order) {
        return peopleCopy.sort((a, b) => b.born - a.born);
      }

      return peopleCopy.sort((a, b) => a.born - b.born);
    case 'died':
      if (order) {
        return peopleCopy.sort((a, b) => b.died - a.died);
      }

      return peopleCopy.sort((a, b) => a.died - b.died);
    default:
      return peopleCopy;
  }
};
