import { Person } from "../types";

export const getPeopleWithParents = (peopleFromServer: Person[]) =>
  peopleFromServer.map(person => ({
    ...person,
    mother: peopleFromServer.find(mother => mother.name === person.motherName),

    father: peopleFromServer.find(father => father.name === person.fatherName),
  }));
