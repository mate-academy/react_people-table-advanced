import { Person } from '../types';

export const FilterForPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  currentCenturies: string[],
) : Person[] => {
  let copyPeople = [...people];
  const queryForFilter = query?.toLowerCase();

  if (sex) {
    copyPeople = copyPeople.filter(person => person.sex === sex);
  }

  if (queryForFilter) {
    copyPeople = copyPeople
      .filter(person => person.name.toLowerCase().includes(queryForFilter)
      || person.motherName?.toLowerCase().includes(queryForFilter)
      || person.fatherName?.toLowerCase().includes(queryForFilter));
  }

  const getCentury = (born: number) => {
    return (Math.floor((born - 1) / 100) + 1).toString();
  };

  if (currentCenturies.length > 0) {
    copyPeople = copyPeople
      .filter(person => currentCenturies.includes(getCentury(person.born)));
  }

  return copyPeople;
};
