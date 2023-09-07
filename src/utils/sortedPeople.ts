/* eslint-disable no-else-return */
import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  sortName: string,
  direction: null | string = null,
) => {
  const sortByNumber = (arr: Person[], sortN: string, dir: null | string) => {
    if (dir) {
      return [...arr].sort((n1, n2) => n2[sortN] - n1[sortN]);
    } else {
      return [...arr].sort((n1, n2) => n1[sortN] - n2[sortN]);
    }
  };

  const sortByString = (arr: Person[], sortN: string, dir: null | string) => {
    if (dir) {
      return [...arr].sort((s1, s2) => s2[sortN].localeCompare(s1[sortN]));
    } else {
      return [...arr].sort((s1, s2) => s1[sortN].localeCompare(s2[sortN]));
    }
  };

  switch (sortName) {
    case 'name':
    case 'sex':
      return sortByString(people, sortName, direction);

    case 'born':
    case 'died':
      return sortByNumber(people, sortName, direction);

    default:
      return people;
  }
};
