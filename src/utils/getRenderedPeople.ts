import { Person } from '../types';
import { sortFunction } from './sorter';

const filterByQuery = (pers: Person, currentQuerry: string) => {
  if (
    pers.name.toLowerCase().includes(currentQuerry.toLowerCase().trim()) ||
    (pers.motherName &&
      pers.motherName
        .toLowerCase()
        .includes(currentQuerry.toLowerCase().trim())) ||
    (pers.fatherName &&
      pers.fatherName
        .toLowerCase()
        .includes(currentQuerry.toLowerCase().trim()))
  ) {
    return true;
  }

  return;
};

export const getRenderedPeople = (
  currentSex: string | null,
  currentQuerry: string,
  chosenCenturies: string[],
  people: Person[],
  searchParams: URLSearchParams,
) => {
  let filteredPeople = [...people];

  if (currentSex) {
    filteredPeople = filteredPeople.filter(pers => pers.sex === currentSex);
  }

  if (chosenCenturies) {
    filteredPeople = filteredPeople.filter(pers =>
      chosenCenturies.includes(Math.ceil(+pers.born / 100).toString()),
    );
  }

  if (currentQuerry) {
    filteredPeople = filteredPeople.filter(pers =>
      filterByQuery(pers, currentQuerry),
    );
  }

  return sortFunction(filteredPeople, searchParams);
};
