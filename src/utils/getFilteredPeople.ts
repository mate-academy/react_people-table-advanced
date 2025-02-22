import { Person } from '../types';

export function getFilteredPeople(
  peopleArray: Person[],
  currentSex: string | null,
  query: string,
  currentCentury: string[],
) {
  let filteredPeople = peopleArray.filter(({ sex }) =>
    currentSex ? sex === currentSex : true,
  );

  if (query) {
    filteredPeople = filteredPeople.filter(({ name }) =>
      name.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()),
    );
  }

  if (!!currentCentury.length) {
    filteredPeople = filteredPeople.filter(({ born }) =>
      currentCentury.includes(String(Math.ceil(born / 100))),
    );
  }

  return filteredPeople;
}
