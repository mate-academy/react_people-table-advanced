import { Person } from '../types/Person';

export const sortTable = (
  filterPeople: Person[],
  sort: string | null,
) => {
  let sortPeoples = [...filterPeople];

  switch (sort) {
    case 'name':
      sortPeoples = sortPeoples.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'sex':
      sortPeoples = sortPeoples.sort((a, b) => a.sex.localeCompare(b.sex));
      break;

    default:
      break;
  }

  return sortPeoples;
};
