import { Person } from '../types';

const findPerson = (personName: string | null, response: Person[]) => {
  return response.find((person: Person) => person.name === personName);
};

export const setPerson = (response: Person[]) => {
  return response.map(person => {
    return {
      ...person,
      motherName: person.motherName || '-',
      fatherName: person.fatherName || '-',
      mother: findPerson(person.motherName, response),
      father: findPerson(person.fatherName, response),
    };
  });
};
