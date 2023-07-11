import { Person } from '../types';

export const findParent = (
  arr: Person[],
  child: Person,
  whoToSearch: string,
) => {
  if (whoToSearch === 'mother') {
    return arr.find(m => (
      m.name === child.motherName));
  }

  return arr.find(m => (
    m.name === child.fatherName));
};
