import { Person } from './types';

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
