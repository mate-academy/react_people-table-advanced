import { Person } from '../types';

const normalizer = (text: string) => text.toLowerCase();

export const filterPeople = (searchQuery: string,
  sex: string,
  century: string[],
  people: Person[]) => {
  const query = normalizer(searchQuery).trim();
  let peopleToFilter = [...people];

  if (query) {
    peopleToFilter = peopleToFilter.filter(
      person => normalizer(person.name).includes(query)
        || (person.motherName && normalizer(person.motherName).includes(query))
        || (person.fatherName && normalizer(
          person.fatherName,
        ).includes(query)),
    );
  }

  if (century.length) {
    peopleToFilter = peopleToFilter.filter(person => {
      const personCentury = Math.ceil(person.born / 100).toString();

      if (century.includes(personCentury)) {
        return true;
      }

      return false;
    });
  }

  if (sex) {
    peopleToFilter = peopleToFilter.filter(person => person.sex === sex);
  }

  return peopleToFilter;
};
