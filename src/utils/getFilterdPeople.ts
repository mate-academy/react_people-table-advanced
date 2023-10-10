import { Person } from '../types';
import { YEARS_IN_CENTURY } from './constants';

const getCentury = (year: number) => {
  return Math.ceil(year / YEARS_IN_CENTURY);
};

function includesIgnoreCase(str: string | null, query : string) {
  return str?.toLowerCase().includes(query.toLowerCase());
}

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
      .filter(({ name, motherName, fatherName }) => includesIgnoreCase(
        name,
        lowerCaseQuery,
      )
      || includesIgnoreCase(motherName, lowerCaseQuery)
      || includesIgnoreCase(fatherName, lowerCaseQuery));
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
