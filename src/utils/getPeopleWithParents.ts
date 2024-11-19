import { Person } from '../types';

type GetParent = (parentName: string | null) => (person: Person) => boolean;

const getParent: GetParent = parentName => person =>
  parentName !== null && person.name === parentName;

const getParentName = (parentName: string | null) =>
  parentName ? parentName : '-';

export const getPeopleWithParents = (people: Person[]) =>
  people.map(person => ({
    ...person,
    motherName: getParentName(person.motherName),
    fatherName: getParentName(person.fatherName),
    mother: people.find(getParent(person.motherName)),
    father: people.find(getParent(person.fatherName)),
  }));
