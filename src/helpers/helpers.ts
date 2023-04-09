import { Person } from '../types';
import { SortType } from '../types/SortType';

export const getPeopleWithParents = (people: Person[]) => {
  return people.map(person => ({
    ...person,
    mother: people.find(woman => woman.name === person.motherName) || null,
    father: people.find(man => man.name === person.fatherName) || null,
  }));
};

export const getFilteredPeople = (
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sortBy: string,
  order: string,
) => {
  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => (
      person.sex === sex
    ));
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      const { name, motherName, fatherName } = person;
      const textToCheck = (name + motherName + fatherName).toLowerCase();
      const lowerQuery = query.toLowerCase();

      return textToCheck.includes(lowerQuery);
    });
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => (
      centuries.includes(String(Math.ceil(person.born / 100)))
    ));
  }

  if (sortBy) {
    visiblePeople.sort((currPerson, nextPerson) => {
      switch (sortBy) {
        case SortType.NAME:
        case SortType.SEX:
          return currPerson[sortBy].localeCompare(nextPerson[sortBy]);

        case SortType.BORN:
        case SortType.DIED:
          return currPerson[sortBy] - nextPerson[sortBy];

        default:
          return 0;
      }
    });
  }

  if (order) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
