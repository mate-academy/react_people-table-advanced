import { Person } from '../types/Person';

export const getPeoplePrepared = (people: Person[]) => (
  people.map(person => {
    return {
      ...person,
      mother: people.find(({ name }) => name === person.motherName),
      father: people.find(({ name }) => name === person.fatherName),
    };
  })
);
