const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async (): Promise<Person[]> => {
  try {
    const response = await fetch(`${API_URL}`);
    const peopleFromServer = await response.json();

    return peopleFromServer.map((person: Person) => {
      const personWithParents = { ...person };

      personWithParents.mother = peopleFromServer
        .find((mother: Person) => mother.name === person.motherName);
      personWithParents.father = peopleFromServer
        .find((father: Person) => father.name === person.fatherName);

      return personWithParents;
    });
  } catch (error) {
    return [];
  }
};
