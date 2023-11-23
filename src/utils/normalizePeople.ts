import { Person } from '../types/Person/Person';

export function normalizePeople(peopleFromServer: Person[]): Person[] {
  const people = peopleFromServer.map(person => {
    const motherPerson = peopleFromServer.find(mother => (
      mother.name === person.motherName));

    const fatherPerson = peopleFromServer.find(father => (
      father.name === person.fatherName));

    return {
      ...person,
      mother: motherPerson,
      father: fatherPerson,
    };
  });

  return people;
}
