import { Person } from '../types';

const filterByCentury = (centuries: string[]) => (person: Person) => {
  const century = Math.ceil(person.died / 100);

  return !centuries.length ? true : centuries.includes(`${century}`);
};

const filterBySex = (sex: string) => (person: Person) =>
  sex ? person.sex === sex : true;

const filterByName =
  (queryName: string) =>
  ({ name, motherName, fatherName }: Person) =>
    name.includes(queryName) ||
    fatherName?.includes(queryName) ||
    motherName?.includes(queryName);

const combinedFilter =
  (sex: string, centuries: string[], name: string) => (person: Person) =>
    [filterBySex(sex), filterByCentury(centuries), filterByName(name)].every(
      filterFn => filterFn(person),
    );

export const getFilteredPeople = (
  people: Person[],
  sex: string,
  name: string,
  centuries: string[],
) => people.filter(combinedFilter(sex, centuries, name));
