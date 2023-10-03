import { Person } from '../types';

const getCentury = (year: number) => {
  return Math.ceil(year / 100);
};

export function getFilterdPeople(
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
) {
  let filteredPeople = [...people];

  if (query) {
    const lowerCaseQuery = query.toLowerCase();

    filteredPeople = filteredPeople
      .filter(({ name, motherName, fatherName }) => name
        .toLowerCase()
        .includes(lowerCaseQuery)
      || motherName?.toLowerCase().includes(lowerCaseQuery)
      || fatherName?.toLowerCase().includes(lowerCaseQuery));
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    const numberCentury = centuries.map(Number);

    filteredPeople = filteredPeople
      .filter(({ born }) => numberCentury.includes(getCentury(born)));
  }

  return filteredPeople;
}
