import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  sort: string,
  reverse: boolean,
) => {
  const peopleCopy = [...people];
  const men = peopleCopy.filter(person => person.sex === 'm');
  const women = peopleCopy.filter(person => person.sex === 'f');

  switch (sort) {
    case 'name':
      return peopleCopy.sort((a, b) => {
        if (reverse) {
          return b.name.localeCompare(a.name);
        }

        return a.name.localeCompare(b.name);
      });

    case 'sex':
      if (reverse) {
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
      if (reverse) {
        return peopleCopy.sort((a, b) => b.born - a.born);
      }

      return peopleCopy.sort((a, b) => a.born - b.born);

    case 'died':
      if (reverse) {
        return peopleCopy.sort((a, b) => b.died - a.died);
      }

      return peopleCopy.sort((a, b) => a.died - b.died);

    default:
      return peopleCopy;
  }
};
