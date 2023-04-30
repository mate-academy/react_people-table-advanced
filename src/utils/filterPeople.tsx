import { Person } from '../types';
import { SortType } from '../types/SortType';

const normalizer = (text: string) => text.toLowerCase();

export const filterPeople = (searchQuery: string,
  sex: string,
  century: string[],
  sort: string,
  order:string,
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

  if (sort) {
    peopleToFilter = peopleToFilter.sort((
      personA, personB,
    ) => {
      switch (sort) {
        case SortType.NAME:
          return personA.name.localeCompare(personB.name);

        case SortType.SEX:
          return personA.sex.localeCompare(personB.sex);

        case SortType.BORN:
          return personA.born - personB.born;

        case SortType.DIED:
          return personA.died - personB.died;

        default:
          throw new Error('The sort type is not defined');
      }
    });
  }

  if (order) {
    peopleToFilter.reverse();
  }

  return peopleToFilter;
};
