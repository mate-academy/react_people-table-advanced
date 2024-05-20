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
  if (currentSex && chosenCenturies.length > 0) {
    return sortFunction(
      people.filter(
        pers =>
          pers.sex === currentSex &&
          filterByQuery(pers, currentQuerry) &&
          chosenCenturies.includes(Math.ceil(+pers.born / 100).toString()),
      ),
      searchParams,
    );
  } else if (currentSex && chosenCenturies.length === 0) {
    return sortFunction(
      people.filter(
        pers => pers.sex === currentSex && filterByQuery(pers, currentQuerry),
      ),
      searchParams,
    );
  } else if (!currentSex && chosenCenturies.length > 0) {
    return sortFunction(
      people.filter(
        pers =>
          filterByQuery(pers, currentQuerry) &&
          chosenCenturies.includes(Math.ceil(+pers.born / 100).toString()),
      ),
      searchParams,
    );
  } else {
    return sortFunction(
      people.filter(pers => filterByQuery(pers, currentQuerry)),
      searchParams,
    );
  }
};
