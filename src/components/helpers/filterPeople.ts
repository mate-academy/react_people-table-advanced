import { Person } from '../../types';
import { FilterParams } from '../../types/FilterParams';

export const filterPeople = (
  filterParams: FilterParams,
): Person[] => {
  const {
    sex,
    query,
    centuries,
    people,
  } = filterParams;

  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = people.filter(person => person.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      const { name, fatherName, motherName } = person;
      const check = (name + fatherName + motherName).toLowerCase();

      return query && check.includes(query.toLowerCase());
    });
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(century.toString());
    });
  }

  return filteredPeople;
};
