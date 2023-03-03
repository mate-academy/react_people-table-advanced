import { Person } from '../types/Person';

export const filterPeopleBySex = (currentPeople: Person[], param: string) => {
  const currentPeopleFiltered = currentPeople.filter(person => (
    person.sex === param
  ));

  return (
    currentPeopleFiltered.length
      ? currentPeopleFiltered
      : currentPeople
  );
};
