import { Person } from './types';
import { SortBy } from './types/SortBy';
import { SortOrder } from './types/SortOrder';

function findParent(peopleList: Person[], parentName: string | null) {
  return peopleList.find(({ name }) => name === parentName);
}

export function getPeopleWithParents(
  peopleList: Person[],
) {
  return peopleList?.map(person => ({
    ...person,
    mother: findParent(peopleList, person.motherName),
    father: findParent(peopleList, person.fatherName),
  }));
}

export function sortPeople(
  people: Person[],
  oldSort?: string | null,
  oldOrder?: string | null,
): Person[] {
  const humans: Person[] = [...people];

  return humans.sort((humanA: Person, humanB: Person): number => {
    if (oldSort === SortBy.Name) {
      return oldOrder === SortOrder.Desc
        ? (humanA.name.localeCompare(humanB.name) * -1)
        : humanA.name.localeCompare(humanB.name);
    }

    if (oldSort === SortBy.Sex) {
      return oldOrder === SortOrder.Desc
        ? (humanA.sex.localeCompare(humanB.sex) * -1)
        : humanA.sex.localeCompare(humanB.sex);
    }

    if (oldSort === SortBy.Died) {
      return oldOrder === SortOrder.Desc
        ? humanB.died - humanA.died
        : humanA.died - humanB.died;
    }

    if (oldSort === SortBy.Born) {
      return oldOrder === SortOrder.Desc
        ? humanB.born - humanA.born
        : humanA.born - humanB.born;
    }

    return 0;
  });
}
