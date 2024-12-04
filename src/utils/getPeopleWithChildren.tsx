import { Person } from '../types';

export const getPeopleWithChildren = (currentPeople: Person[]) => {
  const result = currentPeople.map(person => {
    const human = { ...person };

    human.mother = currentPeople.find(
      onePerson => human.motherName === onePerson.name,
    );

    human.father = currentPeople.find(
      onePerson => human.fatherName === onePerson.name,
    );

    return human;
  });

  return result;
};
