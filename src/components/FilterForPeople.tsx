import { Person } from '../types';

export const FilterForPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[],
) : Person[] => {
  let copyPeople = [...people];
  const queryForFilter = query?.toLowerCase();

  if (sex) {
    copyPeople = copyPeople.filter(person => person.sex === sex);
  }

  if (queryForFilter) {
    copyPeople = copyPeople
      .filter(({
        name, fatherName, motherName,
      }) => name.toLowerCase().includes(queryForFilter)
      || motherName?.toLowerCase().includes(queryForFilter)
      || fatherName?.toLowerCase().includes(queryForFilter));
  }

  const getCentury = (born: number) => {
    return (Math.floor((born - 1) / 100) + 1).toString();
  };

  if (centuries.length > 0) {
    copyPeople = copyPeople
      .filter(person => centuries.includes(getCentury(person.born)));
  }

  return copyPeople;
};
