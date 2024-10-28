import { Person } from '../types';
import { FilterParams } from '../types/FilterParams';

export const getFilteredPeople = (
  filterParams: FilterParams,
  people: Person[],
) => {
  return people.filter(({ name, sex, born }) => {
    const filterCentury = !filterParams.centuries.length
      ? true
      : filterParams.centuries.includes(Math.ceil(born / 100).toString());

    return (
      name.toLowerCase().includes(filterParams.query.toLowerCase()) &&
      sex.includes(filterParams.sex) &&
      filterCentury
    );
  });
};
