import { Person } from '../types';
import { SortType } from '../types/SortType';

export const getPersonParents = (person: Person, people: Person[]): Person => {
  const { fatherName, motherName } = person;

  const personFather = people.find(
    parent => parent.name === fatherName,
  );

  const personMother = people.find(
    parent => parent.name === motherName,
  );

  return {
    ...person,
    father: personFather,
    mother: personMother,
  };
};

export const getFilteredPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
): Person[] => {
  let tempCopyOfPeople = people;
  const validQuery = query.toLowerCase().trim();

  if (query) {
    tempCopyOfPeople = tempCopyOfPeople.filter(({
      name,
      motherName,
      fatherName,
    }) => (
      name.toLowerCase().includes(validQuery)
        || motherName?.toLowerCase().includes(validQuery)
        || fatherName?.toLowerCase().includes(validQuery)
    ));
  }

  if (centuries.length > 0) {
    tempCopyOfPeople = tempCopyOfPeople.filter(person => {
      const personCentury = Math.ceil(person.born / 100).toString();

      if (centuries.includes(personCentury)) {
        return true;
      }

      return false;
    });
  }

  if (sex) {
    tempCopyOfPeople = tempCopyOfPeople.filter(person => person.sex === sex);
  }

  return tempCopyOfPeople;
};

export const getSortedPeople = (
  people: Person[],
  sort: SortType,
  order: string | null,
) => {
  const tempCopyOfPeople = [...people];

  switch (sort) {
    case SortType.BORN:
    case SortType.DIED:
      tempCopyOfPeople.sort((person1, person2) => (
        person1[sort] - person2[sort]
      ));
      break;

    case SortType.NAME:
    case SortType.SEX:
      tempCopyOfPeople.sort((person1, person2) => (
        person1[sort].localeCompare(person2[sort])
      ));
      break;

    default:
      break;
  }

  return order === 'desc'
    ? tempCopyOfPeople.reverse()
    : tempCopyOfPeople;
};
