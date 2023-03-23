import { Person } from '../types';
import { SortFieldTable } from '../types/SortFieldTable';

export const preparePeople = (people: Person[]): Person[] => {
  return people.map(person => {
    const findMother = people.find(mother => person.motherName === mother.name);
    const findFather = people.find(father => person.fatherName === father.name);
    const personCopy = { ...person };

    personCopy.mother = findMother;
    personCopy.father = findFather;

    return personCopy;
  });
};

export const getFilteredPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centries: string[],
  order: string | null,
  sortBy: string | null,
): Person[] => {
  let copyPeople = [...people];

  if (sex) {
    copyPeople = copyPeople.filter(person => person.sex === sex);
  }

  if (query) {
    copyPeople = copyPeople.filter(person => {
      const compareString = person.name + person.fatherName + person.motherName;

      return compareString.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (centries.length > 0) {
    copyPeople = copyPeople
      .filter(person => centries
        .includes((Math.ceil(person.born / 100)).toString()));
  }

  if (sortBy) {
    copyPeople.sort((prevPerson, currPerson) => {
      switch (sortBy) {
        case SortFieldTable.NAME:
        case SortFieldTable.SEX:
          return prevPerson[sortBy].localeCompare(currPerson[sortBy]);

        case SortFieldTable.DIED:
        case SortFieldTable.BORN:
          return prevPerson.died - currPerson.died;

        default:
          return 0;
      }
    });
  }

  if (order) {
    copyPeople.reverse();
  }

  return copyPeople;
};
