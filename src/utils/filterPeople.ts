import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  query: string,
  centuries: string[],
  sex: string,
) => {
  let filteredPeople = people;
  const modifiedQuery = query.trim().toLowerCase();
  const normalizedCenturies = centuries.map(century => +century) || [];

  if (normalizedCenturies.length) {
    filteredPeople = filteredPeople?.filter(person =>
      normalizedCenturies.includes(Math.ceil(person.born / 100)),
    );
  }

  if (sex) {
    filteredPeople = filteredPeople?.filter(human => human.sex === sex);
  }

  if (modifiedQuery) {
    filteredPeople = filteredPeople?.filter(
      human =>
        human.name.toLowerCase().includes(modifiedQuery) ||
        human.motherName?.toLowerCase().includes(modifiedQuery) ||
        human.fatherName?.toLowerCase().includes(modifiedQuery),
    );
  }

  return filteredPeople;
};
