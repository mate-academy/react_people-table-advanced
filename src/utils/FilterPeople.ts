import { Person } from '../types';

export const filterPeople = (
  peopleList: Person[],
  query: string,
  centuries: string[],
  sex: string | null,
) => {
  let list = [...peopleList];

  if (query) {
    list = peopleList.filter(({ name, motherName, fatherName }) => {
      return (name + fatherName + motherName)
        .toLowerCase().includes(query.toLowerCase());
    });
  }

  if (centuries.length) {
    list = list
      .filter(item => centuries?.includes(`${Math.ceil(item.born / 100)}`));
  }

  if (sex) {
    list = list
      .filter(item => item.sex === sex);
  }

  return list;
};
