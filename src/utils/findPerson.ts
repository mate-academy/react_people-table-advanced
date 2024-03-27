import { Person } from '../types';

export const findPerson = (peopleArr: Person[], nameKey: string | null) =>
  peopleArr.find(({ name: personName }) => personName === nameKey);
