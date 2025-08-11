import { Person } from '../types';

export default function getNormalizedPeople(people: Person[]) {
  return people.map(currentPerson => {
    const mother = people.find(
      person => person.name === currentPerson.motherName,
    );
    const father = people.find(
      person => person.name === currentPerson.fatherName,
    );

    return { ...currentPerson, mother, father };
  });
}
