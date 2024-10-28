import { Person } from '../types';
import { FilterParams } from '../types/FilterParams';

export const getFilteredPeople = (
  filterParams: FilterParams,
  people: Person[],
) => {
  return people.filter(({ name, sex, born, father, mother }) => {
    const filterCentury = !filterParams.centuries.length
      ? true
      : filterParams.centuries.includes(Math.ceil(born / 100).toString());

    const query = filterParams.query.toLowerCase().trim();

    const isNameIncluded =
      name.toLowerCase().includes(query) ||
      father?.name.toLowerCase().includes(query) ||
      mother?.name.toLowerCase().includes(query);

    return isNameIncluded && sex.includes(filterParams.sex) && filterCentury;
  });
};
