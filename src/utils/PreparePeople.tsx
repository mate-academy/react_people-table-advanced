import { Person } from '../types';

export function preparePeople(people: Person[]) {
  return people.map((person, _, peopleArr) => ({
    ...person,
    mother: peopleArr.find(p => p.name === person.motherName),
    father: peopleArr.find(p => p.name === person.fatherName),
  }));
}
