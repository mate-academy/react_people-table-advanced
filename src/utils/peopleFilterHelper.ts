import { Person } from '../types';
import { SortType } from '../types/SortType';

export const getFilteredPeople = (data: Person[],
  filterCallback: (person: Person) => boolean) => {
  return data.filter(filterCallback);
};

export const filterBySex = (person: Person, sex: string) => {
  return !sex || person.sex === sex;
};

export const filterByCenturies = (person: Person, centuries: string[]) => {
  return centuries.length === 0 || centuries.includes(`${Math.ceil(person.born / 100)}`);
};

export const filterByName = (person: Person, query: string): boolean => {
  const name = person.name ? person.name.toLowerCase() : '';
  const motherName = person.motherName ? person.motherName.toLowerCase() : '';
  const fatherName = person.fatherName ? person.fatherName.toLowerCase() : '';

  return (
    name.includes(query.toLowerCase())
    || motherName.includes(query.toLowerCase())
    || fatherName.includes(query.toLowerCase())
  );
};

export const sortPeople = (data: Person[], sort: string) => {
  switch (sort) {
    case SortType.Name:
    case SortType.Sex:
      return data.sort((person1, person2) => person1[sort]
        .localeCompare(person2[sort]));

    case SortType.Born:
    case SortType.Died:
      return data.sort((person1, person2) => person1[sort] - person2[sort]);

    default:
      return data;
  }
};

export const reversePeopleOrder = (data: Person[], order: string) => {
  return order ? data.reverse() : data;
};
