import { Person, Sort } from '../types';

export const sortPeople = (
  people: Person[],
  sorting: string,
  isDescending: string,
) => {
  const peopleCopy = [...people];

  switch (sorting) {
    case Sort.name:
      peopleCopy.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case Sort.sex:
      peopleCopy.sort((a, b) => a.sex.localeCompare(b.sex));
      break;

    case Sort.birth:
      peopleCopy.sort((a, b) => a.born - b.born);
      break;

    case Sort.death:
      peopleCopy.sort((a, b) => a.died - b.died);
      break;

    default:
      return people;
  }

  if (isDescending) {
    return peopleCopy.reverse();
  }

  return peopleCopy;
};
