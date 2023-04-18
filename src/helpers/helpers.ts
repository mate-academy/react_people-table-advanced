import { SortType } from '../enums/SortType';
import { Person } from '../types';

export const findParent = (
  people: Person[],
  parentName: string | null,
): Person | null => {
  return people.find(({ name }) => name === parentName) || null;
};

export const getTypeOfSort = (sortType: string | null): SortType => {
  switch (sortType) {
    case SortType.NAME:
      return SortType.NAME;

    case SortType.SEX:
      return SortType.SEX;

    case SortType.BORN:
      return SortType.BORN;

    case SortType.DIED:
      return SortType.DIED;

    case SortType.NONE:
    default:
      return SortType.NONE;
  }
};

export const filterPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
): Person[] => {
  let peopleFiltered = [...people];

  if (sex) {
    peopleFiltered = peopleFiltered.filter((person) => person.sex === sex);
  }

  if (query) {
    peopleFiltered = peopleFiltered.filter((person) => {
      const {
        name,
        motherName,
        fatherName,
      } = person;

      return name.includes(query)
        || motherName?.includes(query)
        || fatherName?.includes(query);
    });
  }

  if (centuries.length > 0) {
    const getCentury = (person: Person) => {
      return Math.ceil(person.born / 100);
    };

    peopleFiltered = peopleFiltered.filter((person) => (
      centuries.includes(getCentury(person).toString())
    ));
  }

  return peopleFiltered;
};

export const sortPeople = (
  filteredPeople: Person[],
  sort: string | null,
  order: string | null,
): Person[] => {
  const peopleSorted = [...filteredPeople];

  if (sort) {
    switch (sort) {
      case SortType.NAME:
      case SortType.SEX:
        peopleSorted.sort((prevPerson, currPerson) => (
          prevPerson[sort].localeCompare(currPerson[sort])
        ));
        break;

      case SortType.BORN:
      case SortType.DIED:
        peopleSorted.sort((prevPerson, currPerson) => (
          prevPerson[sort] - currPerson[sort]
        ));
        break;

      default:
        break;
    }
  }

  if (order === 'desc') {
    peopleSorted.reverse();
  }

  return peopleSorted;
};
