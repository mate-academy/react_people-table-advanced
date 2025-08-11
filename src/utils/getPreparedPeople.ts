import { Person } from '../types';

export const getPreparedPeople = (people: Person[]): Person[] => {
  const preperedPeople = people?.map(person => ({
    ...person,
    mother: people.find(pers => pers.name === person.motherName),
    father: people.find(pers => pers.name === person.fatherName),
  }));

  return preperedPeople;
};
