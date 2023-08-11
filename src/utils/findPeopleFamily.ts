import { Person } from '../types';

export const findPeopleFamily = (peoples: Person[]) : Person[] => {
  const peoplesWithFamily = peoples.map((person) => {
    const mother = peoples.find((human) => human.name === person.motherName);
    const father = peoples.find((human) => human.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });

  return peoplesWithFamily;
};
