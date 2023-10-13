import { Person } from '../types/Person';

export const getPreparedPeople = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(m => m.name === person.motherName);
    const father = people.find(f => f.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};
