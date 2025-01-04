import { Person } from '../types/Person';

export const isInfoAvailable = (info: string) => {
  return info || '-';
};

export const findParent = (people: Person[], parentName: string | null) => {
  return people.find((person: Person) => person.name === parentName);
};

export const formPeopleData = (people: Person[]) => {
  return people.map((person: Person) => {
    return {
      ...person,
      motherName: person.motherName || '-',
      fatherName: person.fatherName || '-',
      mother: findParent(people, person.motherName),
      father: findParent(people, person.fatherName),
    };
  });
};
