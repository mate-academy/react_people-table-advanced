import { Person } from '../types';

export function getExtendedPersonList(data: Person[]): Person[] {
  return data.map(person => ({
    ...person,
    mother: data.find(curPerson => person.motherName === curPerson.name),
    father: data.find(curPerson => person.fatherName === curPerson.name),
  }));
}
