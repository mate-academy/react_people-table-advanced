import { Person } from '../types/person';

export const getPeople = async (): Promise<Person[]> => {
  const res = await fetch('https://mate-academy.github.io/react_people-table/api/people.json');
  const peopleFromServer = await res.json();

  return peopleFromServer.map((person: Person) => {
    const personWithParents = { ...person };

    personWithParents.mother = peopleFromServer
      .find((mother: Person) => mother.name === person.motherName);
    personWithParents.father = peopleFromServer
      .find((father: Person) => father.name === person.fatherName);

    return personWithParents;
  });
};
