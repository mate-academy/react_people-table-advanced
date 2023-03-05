import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[],
  sex: string,
  query: string,
  centuries: number[],
) => {
  let peopleToShow: Person[] = people;

  if (sex) {
    peopleToShow = peopleToShow
      .filter((person: Person) => (person.sex === sex));
  }

  if (query) {
    peopleToShow = peopleToShow
      .filter((person: Person) => person.name.toLowerCase()
        .includes(query.toLowerCase()));
  }

  if (centuries.length) {
    peopleToShow = peopleToShow
      .filter((person: Person) => centuries
        .includes(Math.ceil(person.born / 100)));
  }

  return peopleToShow;
};
