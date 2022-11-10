import { Person } from '../types/Person';

export const groupedPeopleData = (people: Person[]) => (
  people.map((person) => (
    {
      ...person,
      mother: people.find(woman => woman.name === person.motherName),
      father: people.find(man => man.name === person.fatherName),
    }
  )));
