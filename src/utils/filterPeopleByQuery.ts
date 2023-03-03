import { Person } from '../types/Person';

export const filterPeopleByQuery = (currentPeople: Person[], param: string) => {
  const lowerCaseInputQuery = param.toLowerCase().trimStart();

  if (lowerCaseInputQuery) {
    return currentPeople.filter(person => {
      const compareString = (person.name
        + person.motherName
        + person.fatherName).toLowerCase();

      return compareString.includes(lowerCaseInputQuery);
    });
  }

  return currentPeople;
};
