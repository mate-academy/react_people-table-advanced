import { Person } from '../types';

export const getPerson = (
  person: Person,
  currentPerson: React.ReactNode,
): Person | undefined => {
  let result;

  switch (true) {
    case person.father?.name === currentPerson:
      result = person.father;
      break;
    case person.mother?.name === currentPerson:
      result = person.mother;
      break;
    default:
      result = person;
      break;
  }

  return result;
};
