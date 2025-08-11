import { Person } from '../types/Person';

export const getPreparedPeople = (people: Person[]) =>
  people.map(person => {
    const mother = people.find(woman => woman.name === person.motherName);
    const father = people.find(man => man.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
