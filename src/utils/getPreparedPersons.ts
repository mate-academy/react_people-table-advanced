import { Person, Gender } from '../types';
import { findRelative } from './findRelative';

export const getPreparedPersons = (allPersons: Person[]) => {
  return [...allPersons].map(onePerson => {
    const mother = findRelative(Gender.FEMALE, onePerson, allPersons);
    const father = findRelative(Gender.MALE, onePerson, allPersons);

    return {
      ...onePerson,
      mother,
      father,
    };
  });
};
